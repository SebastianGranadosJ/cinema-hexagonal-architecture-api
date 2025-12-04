import NullObject from "../../../../shared/base/domain/model/interfaces/NullObject"
import Vehicle from "../Vehicle/Vehicle"


export default class ParkingSession implements NullObject{
  private recordId: string | null 
  private vehicle: Vehicle
  private entryDateTime: Date
  private exitDateTime: Date | null
  private isFinished: boolean
  private parkedMinutes: number | null
  private isClient: boolean
  private amountPaid: number
  isNull: boolean

  constructor(data: ParkingRecordInterface) {
    this.recordId = data.recordId ?? "unassigned"
    this.vehicle = data.vehicle
    this.entryDateTime = data.entryDateTime
    this.exitDateTime = data.exitDateTime ?? null
    this.isFinished = data.isFinished  
    this.parkedMinutes = data.parkedMinutes ?? null
    this.isClient = data.isClient
    this.amountPaid = data.amountPaid ?? 0
    this.isNull = false
  }
    

  // --- Getters ---
  getRecordId = (): string | null  => this.recordId
  
  getVehicle = (): Vehicle => this.vehicle

  getEntryDateTime = (): Date => this.entryDateTime

  getExitDateTime = (): Date | null => this.exitDateTime

  getIsFinished = (): boolean => this.isFinished

  getParkedMinutes = (): number | null  => this.parkedMinutes

  getIsClient = (): boolean => this.isClient

  getAmountPaid = (): number => this.amountPaid

  // --- Setters ---
  setRecordId = (id: string): void => { this.recordId = id }

  setVehicle = (vehicle: Vehicle): void => { this.vehicle = vehicle }

  setEntryDateTime = (date: Date): void => { this.entryDateTime = date }

  setExitDateTime = (date: Date | null): void => { this.exitDateTime = date }

  setIsFinished = (finished: boolean): void => { this.isFinished = finished }

  setParkedMinutes = (minutes: number): void => { this.parkedMinutes = minutes }

  setIsClient = (client: boolean): void => { this.isClient = client }

  setAmountPaid = (amount: number): void => { this.amountPaid = amount }
}

export interface ParkingRecordInterface {
  recordId?: string
  vehicle: Vehicle
  entryDateTime: Date
  exitDateTime: Date | null 
  isFinished: boolean
  parkedMinutes: number| null
  isClient: boolean
  amountPaid: number
}