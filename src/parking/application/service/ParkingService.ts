import ParkingServiceInterface from "../../domain/interface/ParkingServiceInterface"
import DayliReport from "../../domain/model/DayliReport/DayliReport"
import NullDayliReport from "../../domain/model/DayliReport/NullDailyReport"
import NullParkingSession from "../../domain/model/ParkingSession/NullParkingSession"
import ParkingSession from "../../domain/model/ParkingSession/ParkingSession"
import NullVehicle from "../../domain/model/Vehicle/NullVehicle"
import Vehicle from "../../domain/model/Vehicle/Vehicle"
import VehicleType from "../../domain/model/Vehicle/VehicleType"
import CustomerVehicleRepositoryPort from "../../domain/port/driven/adapter/CustomerVehicleRepositoryPort"
import ParkingSessionRepositoryPort from "../../domain/port/driven/adapter/ParkingSessionRepositoryPort"


export default class ParkingService implements ParkingServiceInterface {
  constructor(
    private readonly sessionRepo: ParkingSessionRepositoryPort,
    private readonly customerVehicleRepo: CustomerVehicleRepositoryPort
  ) { }

  readonly openSesion = async (session: ParkingSession): Promise<ParkingSession> => {
    try {
      return await this.sessionRepo.openSesion(session)
    } catch (error) {
      console.error("Error in ParkingService.openSesion:", error)
      return new NullParkingSession()
    }
  }

  readonly closeSession = async (session: ParkingSession): Promise<ParkingSession> => {
    try {
      return await this.sessionRepo.closeSession(session)
    } catch (error) {
      console.error("Error in ParkingService.closeSession:", error)
      return new NullParkingSession()
    }
  }

  readonly countActiveByType = async (type: VehicleType): Promise<number> => {
    try {
      return await this.sessionRepo.countActiveByType(type)
    } catch (error) {
      console.error("Error in ParkingService.countActiveByType:", error)
      return -1
    }
  }

  readonly generateDayliReport = async (date: Date): Promise<DayliReport> => {
    try {
      return await this.sessionRepo.generateDayliReport(date)
    } catch (error) {
      console.error("Error in ParkingService.generateDayliReport:", error)
      return new NullDayliReport()
    }
  }

  readonly findByPlate = async (plate: string): Promise<Vehicle> => {
    try {
      return await this.customerVehicleRepo.findByPlate(plate)
    } catch (error) {
      console.error("Error in ParkingService.findByPlate:", error)
      return new NullVehicle()
    }
  }

  readonly getActiveSessionByPlate = async (plate: string): Promise<ParkingSession> => {
    try {
      return await this.sessionRepo.getActiveSessionByPlate(plate)
    } catch (error) {
      console.error("Error in ParkingService.getActiveSessionByPlate:", error)
      return new NullParkingSession()
    }
  }
}
