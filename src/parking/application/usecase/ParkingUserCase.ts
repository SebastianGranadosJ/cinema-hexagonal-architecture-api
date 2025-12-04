import ParkingServiceInterface from "../../domain/interface/ParkingServiceInterface";
import DayliReport from "../../domain/model/DayliReport/DayliReport";
import NullDayliReport from "../../domain/model/DayliReport/NullDailyReport";
import NullParkingSession from "../../domain/model/ParkingSession/NullParkingSession";
import ParkingSession from "../../domain/model/ParkingSession/ParkingSession";
import Vehicle from "../../domain/model/Vehicle/Vehicle";
import VehicleType from "../../domain/model/Vehicle/VehicleType";
import ParkingUserCasePort from "../../domain/port/driver/usecase/ParkingUserCasePort";
import ParkingCapacityHelper from "./helper/ParkingCapacityHelper";
import ParkingValueHelper from "./helper/ParkingValueHelper";


export default class ParkingUserCase implements ParkingUserCasePort {

    constructor(private readonly parkingService: ParkingServiceInterface) { }

    readonly generateDayliBalance = async (date: Date): Promise<DayliReport> => {
        try {
            return await this.parkingService.generateDayliReport(date)
        } catch (error) {
            console.error("Error in generateDayliBalance:", error)
            return new NullDayliReport()
        }
    }

    readonly registerEntry = async (plate: string, type: VehicleType): Promise<ParkingSession> => {
        try {
            const vehicle = await this.parkingService.findByPlate(plate)

            let isClient = true
            let finalVehicle: Vehicle

            if (vehicle.isNull) {
                if (type === VehicleType.UNKNOWN) { return new NullParkingSession() }

                isClient = false
                finalVehicle = new Vehicle({
                    numberPlate: plate,
                    vehicleType: type,
                })
            } else {
                finalVehicle = vehicle
            }

            const activeCount = await this.parkingService.countActiveByType(finalVehicle.getVehicleType())

            const capacity = ParkingCapacityHelper.getCapacity(finalVehicle.getVehicleType())


            if (capacity > 0 && activeCount >= capacity) { return new NullParkingSession() }

            const session = new ParkingSession({
                vehicle: finalVehicle,
                entryDateTime: new Date(),
                exitDateTime: null,
                isFinished: false,
                parkedMinutes: null,
                isClient,
                amountPaid: 0,
            })

            const savedSession = await this.parkingService.openSesion(session)
            return savedSession
        } catch (error) {
            console.error("Error in registerEntry:", error)
            return new NullParkingSession()
        }
    }

    readonly registerExit = async (plate: string): Promise<ParkingSession> => {
        try {

            const session = await this.parkingService.getActiveSessionByPlate(plate)
            if (session.isNull) { return new NullParkingSession() }

            const vehicleType = session.getVehicle().getVehicleType()

            const now = new Date()
            const diffMs = now.getTime() - session.getEntryDateTime().getTime()
            const minutes = Math.ceil(diffMs / (1000 * 60))

            session.setExitDateTime(now)
            session.setParkedMinutes(minutes)
            session.setIsFinished(true)

            let amountPaid = 0
            if (!session.getIsClient()) {
                const ratePerMinute = ParkingValueHelper.getValue(vehicleType)
                amountPaid = minutes * ratePerMinute
                amountPaid = Math.ceil(amountPaid * 1.19 )// aplicar IVA 19%
            }

            session.setAmountPaid(amountPaid)

            const closedSession = await this.parkingService.closeSession(session)
            return closedSession
        } catch (error) {
            console.error("Error in registerExit:", error)
            return new NullParkingSession()
        }
    }

}