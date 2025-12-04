import VehicleType from "../../../domain/model/Vehicle/VehicleType"


export default class ParkingValueHelper {
  static readonly CAR_RATE = 88
  static readonly MOTO_RATE = 66

  static getValue(type: VehicleType): number {
    switch (type) {
      case VehicleType.CARRO:
        return this.CAR_RATE
      case VehicleType.MOTO:
        return this.MOTO_RATE
      default:
        return 0
    }
  }
}
