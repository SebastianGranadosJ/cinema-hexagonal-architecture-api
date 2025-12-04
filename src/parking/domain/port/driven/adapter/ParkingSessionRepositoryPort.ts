import DayliReport from "../../../model/DayliReport/DayliReport";
import ParkingSession from "../../../model/ParkingSession/ParkingSession";
import VehicleType from "../../../model/Vehicle/VehicleType";

export default interface ParkingSessionRepositoryPort {
  openSesion(session: ParkingSession): Promise<ParkingSession>
  closeSession(session: ParkingSession): Promise<ParkingSession>
  getActiveSessionByPlate(plate:string):  Promise<ParkingSession>
  countActiveByType(type: VehicleType): Promise<number>
  generateDayliReport(date: Date): Promise<DayliReport>
}
