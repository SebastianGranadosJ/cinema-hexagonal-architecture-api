import VehicleType from "../../../domain/model/Vehicle/VehicleType"

export default class ParkingCapacityHelper {
  static readonly CARRO = 38
  static readonly MOTO = 26

  static getCapacity(type: VehicleType): number {
    switch (type) {
      case VehicleType.CARRO: return this.CARRO
      case VehicleType.MOTO: return this.MOTO
      default: return 0
    }
  }
}
