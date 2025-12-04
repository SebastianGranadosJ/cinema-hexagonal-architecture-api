import NullVehicle from "../Vehicle/NullVehicle"
import Vehicle from "../Vehicle/Vehicle"
import ParkingSession from "./ParkingSession"


export default class NullParkingSession extends ParkingSession {
  constructor() {
    super({
      recordId: 'not-found',
      vehicle: new NullVehicle(),
      entryDateTime: new Date(),
      exitDateTime: new Date(),
      isFinished: false,
      parkedMinutes: 0,
      isClient: false,
      amountPaid: 0,
    })
    this.isNull = true;
  }

  override setRecordId = (_id: string): void => {
    throw new Error('Cannot set recordId on NullParkingRecord')
  }

  override setVehicle = (_vehicle: Vehicle): void => {
    throw new Error('Cannot set vehicle on NullParkingRecord')
  }

  override setEntryDateTime = (_date: Date): void => {
    throw new Error('Cannot set entryDateTime on NullParkingRecord')
  }

  override setExitDateTime = (_date: Date | null): void => {
    throw new Error('Cannot set exitDateTime on NullParkingRecord')
  }

  override setIsFinished = (_finished: boolean): void => {
    throw new Error('Cannot set isFinished on NullParkingRecord')
  }

  override setParkedMinutes = (_minutes: number | null): void => {
    throw new Error('Cannot set parkedMinutes on NullParkingRecord')
  }

  override setIsClient = (_client: boolean): void => {
    throw new Error('Cannot set isClient on NullParkingRecord')
  }

  override setAmountPaid = (_amount: number): void => {
    throw new Error('Cannot set amountPaid on NullParkingRecord')
  }
}
