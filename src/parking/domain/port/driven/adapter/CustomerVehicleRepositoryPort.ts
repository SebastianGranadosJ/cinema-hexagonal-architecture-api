import Vehicle from "../../../model/Vehicle/Vehicle"

export default interface CustomerVehicleRepositoryPort {
  findByPlate(plate: string): Promise<Vehicle>
}
