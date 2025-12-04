import NullParkingSession from "../ParkingSession/NullParkingSession"
import DayliReport from "./DayliReport"

export default class NullDayliReport extends DayliReport {

  constructor() {
    super({
      reportDate: new Date(), // Fecha por defecto (epoch)
      totalEarnings: 0,
      records: [new NullParkingSession()]
    })
    this.isNull = true
  }
}
