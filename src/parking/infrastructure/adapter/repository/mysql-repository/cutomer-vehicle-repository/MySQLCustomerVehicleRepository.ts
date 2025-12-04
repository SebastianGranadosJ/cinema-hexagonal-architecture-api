import MySqlDBC from "../../../../../../shared/repository/infrastructure/dbc/local/mysql/LocalMySQLDBC"
import NullVehicle from "../../../../../domain/model/Vehicle/NullVehicle"
import Vehicle, { VehicleInterface } from "../../../../../domain/model/Vehicle/Vehicle"
import VehicleType from "../../../../../domain/model/Vehicle/VehicleType"
import CustomerVehicleRepositoryPort from "../../../../../domain/port/driven/adapter/CustomerVehicleRepositoryPort"


export default class MySQLCustomerVehicleRepository implements CustomerVehicleRepositoryPort {
  constructor(private readonly mysqlDBC: MySqlDBC) {}

  readonly findByPlate = async (plate: string): Promise<Vehicle> => {
    const sql = `SELECT  numberPlate, vehicleType FROM CustomerVehicle WHERE numberPlate = ? LIMIT 1`
    const rows = await this.mysqlDBC.query<VehicleInterface>(sql, [plate])

    if (rows.length === 0) {
      return new NullVehicle()
    }

    const row = rows[0]

    if(!row){
        return new NullVehicle()
    }

    return new Vehicle({
      numberPlate: row.numberPlate,
      vehicleType: VehicleType[row.vehicleType as keyof typeof VehicleType] ?? VehicleType.UNKNOWN,
    })
  }
}