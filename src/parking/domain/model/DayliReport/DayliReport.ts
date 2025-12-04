import NullObject from "../../../../shared/base/domain/model/interfaces/NullObject"
import ParkingSession from "../ParkingSession/ParkingSession"


export default class DayliReport implements NullObject{
  private reportDate: Date
  private totalEarnings: number
  private records: ParkingSession[]
   isNull: boolean

  constructor (report: DayliReportInterface)  {
    this.reportDate = report.reportDate
    this.totalEarnings = report.totalEarnings
    this.records = report.records
    this.isNull=false
  }
 

  getReportDate = (): Date => {
    return this.reportDate
  }

  getTotalEarnings = (): number => {
    return this.totalEarnings
  }

  getRecords = (): ParkingSession[] => {
    return this.records
  }

  setReportDate = (reportDate: Date): void => {
    this.reportDate = reportDate
  }

  setTotalEarnings = (totalEarnings: number): void => {
    this.totalEarnings = totalEarnings
  }

  setRecords = (records: ParkingSession[]): void => {
    this.records = records
  }
}

export interface DayliReportInterface {
  reportDate: Date
  totalEarnings: number
  records: ParkingSession[]
}