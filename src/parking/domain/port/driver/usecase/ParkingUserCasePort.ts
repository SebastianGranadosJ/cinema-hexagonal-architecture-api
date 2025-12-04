import DayliReport from "../../../model/DayliReport/DayliReport"
import ParkingSession from "../../../model/ParkingSession/ParkingSession"
import VehicleType from "../../../model/Vehicle/VehicleType"


export default interface ParkingUserCasePort {
  registerEntry(plate:String, type: VehicleType): Promise<ParkingSession>
  registerExit(plate: string): Promise<ParkingSession>
  generateDayliBalance(date: Date): Promise<DayliReport>
}