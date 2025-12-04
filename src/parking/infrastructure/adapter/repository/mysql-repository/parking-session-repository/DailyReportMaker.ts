import DayliReport from "../../../../../domain/model/DayliReport/DayliReport"
import ParkingSession from "../../../../../domain/model/ParkingSession/ParkingSession"
import Vehicle from "../../../../../domain/model/Vehicle/Vehicle"


export default class DayliReportMaker {
  static make = (date: Date, rows: any[]): DayliReport => {
    const finishedSessions = rows
      .filter(row => row.exitDateTime) 
      .map(row => {
        const vehicle = new Vehicle({
          numberPlate: row.vehiclePlate,
          vehicleType: row.vehicleType,
        })

        return new ParkingSession({
          recordId: row.recordId,
          vehicle: vehicle,
          entryDateTime: new Date(row.entryDateTime),
          exitDateTime: new Date(row.exitDateTime),
          isFinished: row.isFinished === 1, // por MySQL retorna 0/1
          parkedMinutes: row.parkedMinutes,
          isClient: row.isClient === 1,
          amountPaid: Number(row.amountPaid),
        })
      })

    const totalEarnings = finishedSessions.reduce(
      (sum, session) => sum + session.getAmountPaid(), 
      0
    )

    return new DayliReport({
      reportDate: date,
      totalEarnings,
      records: finishedSessions,
    })
  }
}
