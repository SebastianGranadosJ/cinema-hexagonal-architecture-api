import DayliReport from "../model/DayliReport/DayliReport"
import ParkingSession from "../model/ParkingSession/ParkingSession"
import Vehicle from "../model/Vehicle/Vehicle"
import VehicleType from "../model/Vehicle/VehicleType"


export default interface ParkingServiceInterface {
  openSesion(session: ParkingSession): Promise<ParkingSession>
  closeSession(session: ParkingSession): Promise<ParkingSession>
  countActiveByType(type: VehicleType): Promise<number>
  generateDayliReport(date: Date): Promise<DayliReport>
  findByPlate(plate: string): Promise<Vehicle>
  getActiveSessionByPlate(plate: string): Promise<ParkingSession>
}
