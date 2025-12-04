
import Vehicle from './Vehicle'
import  VehicleType  from './VehicleType'

export default class NullVehicle extends Vehicle {
  constructor() {
    super({
      numberPlate: 'not-found',
      vehicleType: VehicleType.UNKNOWN,
    })
    this.isNull = true
  }

  override setNumberPlate = (_numberPLate: string): void => {
    throw new Error('Cannot set numberPLate on NullVehicle')
  }

  override setVehicleType = (_vehicleType: VehicleType): void => {
    throw new Error('Cannot set vehicleType on NullVehicle')
  }

}
