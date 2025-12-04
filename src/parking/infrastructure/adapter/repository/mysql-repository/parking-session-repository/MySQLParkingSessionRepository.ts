import MySqlDBC from "../../../../../../shared/repository/infrastructure/dbc/local/mysql/LocalMySQLDBC";
import DayliReport from "../../../../../domain/model/DayliReport/DayliReport";
import NullDayliReport from "../../../../../domain/model/DayliReport/NullDailyReport";
import NullParkingSession from "../../../../../domain/model/ParkingSession/NullParkingSession";
import ParkingSession from "../../../../../domain/model/ParkingSession/ParkingSession";
import Vehicle from "../../../../../domain/model/Vehicle/Vehicle";
import VehicleType from "../../../../../domain/model/Vehicle/VehicleType";
import ParkingSessionRepositoryPort from "../../../../../domain/port/driven/adapter/ParkingSessionRepositoryPort";
import DayliReportMaker from "./DailyReportMaker";
import ParkingSessionSQLQueries from "./ParkingSessionSQLQueries"

export default class MySQLParkingSessionRepository implements ParkingSessionRepositoryPort {
  constructor(private readonly mysqlDBC: MySqlDBC) { }


  readonly openSesion = async (session: ParkingSession): Promise<ParkingSession> => {
    try {
      // Ejecutamos el INSERT
      const [result]: any = await (this.mysqlDBC as any).pool.execute(
        ParkingSessionSQLQueries.INSERT,
        [
          session.getVehicle().getNumberPlate(),
          session.getVehicle().getVehicleType(),
          session.getEntryDateTime(),
          false, // isFinished
          session.getIsClient(),
          0      // amountPaid
        ]
      )

      if (result.affectedRows === 0) return new NullParkingSession()


      const insertId = result.insertId

      const recordId = `uuid-park-${String(insertId).padStart(6, "0")}`

      await (this.mysqlDBC as any).pool.execute(
        ParkingSessionSQLQueries.UPDATE_RECORD_ID,
        [recordId, insertId]
      )

      session.setRecordId(recordId)

      return session
    } catch (error) {
      console.error("Error in openSesion:", error)
      return new NullParkingSession()
    }
  }


  readonly closeSession = async (session: ParkingSession): Promise<ParkingSession> => {
    try {
      const [result]: any = await (this.mysqlDBC as any).pool.execute(
        ParkingSessionSQLQueries.UPDATE_CLOSE,
        [
          session.getExitDateTime(),
          session.getIsFinished(),
          session.getParkedMinutes(),
          session.getAmountPaid(),
          session.getVehicle().getNumberPlate()
        ]
      )

      if (result.affectedRows === 0) return new NullParkingSession()
      return session
    } catch (error) {
      console.error("Error in closeSession:", error)
      return new NullParkingSession()
    }
  }

  readonly countActiveByType = async (type: VehicleType): Promise<number> => {
    try {
      const rows = await this.mysqlDBC.query<{ total: number }>(
        ParkingSessionSQLQueries.COUNT_ACTIVE_BY_TYPE,
        [type]
      )

      if (rows.length === 0) return -1
      const row = rows[0]
      if (!row) return -1

      return row.total
    } catch (error) {
      console.error("Error in countActiveByType:", error)
      return -1
    }
  }

  readonly generateDayliReport = async (date: Date): Promise<DayliReport> => {
  try {
    // Formatear la fecha a YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0]

    const rows = await this.mysqlDBC.query<any>(
      ParkingSessionSQLQueries.SELECT_REPORT,
      [formattedDate]
    )

    return DayliReportMaker.make(date, rows)
  } catch (error) {
    console.error("Error generating dayli report:", error)
    return new NullDayliReport()
  }
}


  readonly getActiveSessionByPlate = async (plate: string): Promise<ParkingSession> => {
    try {
      const rows = await this.mysqlDBC.query<any>(
        ParkingSessionSQLQueries.SELECT_ACTIVE_BY_PLATE,
        [plate]
      )

      if (rows.length === 0) { return new NullParkingSession() }

      const row = rows[0]

      const vehicle = new Vehicle({
        numberPlate: row.vehiclePlate,
        vehicleType: VehicleType[row.vehicleType as keyof typeof VehicleType] ?? VehicleType.UNKNOWN,
      })

      return new ParkingSession({
        recordId: row.recordId,
        vehicle: vehicle,
        entryDateTime: new Date(row.entryDateTime),
        exitDateTime: row.exitDateTime ? new Date(row.exitDateTime) : null,
        isFinished: row.isFinished === 1,
        parkedMinutes: row.parkedMinutes,
        isClient: row.isClient === 1,
        amountPaid: Number(row.amountPaid),
      })
    } catch (error) {
      console.error("Error in getActiveSessionByPlate:", error)
      return new NullParkingSession()
    }
  }

}
