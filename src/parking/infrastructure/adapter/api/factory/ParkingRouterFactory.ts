import { AbstractRouter } from "../../../../../api/API"
import MySqlDBC from "../../../../../shared/repository/infrastructure/dbc/local/mysql/LocalMySQLDBC"
import ParkingService from "../../../../application/service/ParkingService"
import ParkingUserCase from "../../../../application/usecase/ParkingUserCase"
import MySQLCustomerVehicleRepository from "../../repository/mysql-repository/cutomer-vehicle-repository/MySQLCustomerVehicleRepository"
import MySQLParkingSessionRepository from "../../repository/mysql-repository/parking-session-repository/MySQLParkingSessionRepository"
import ParkingController from "../controller/ParkingController"
import ReportController from "../controller/ReportControllet"
import ParkingRouter from "../router/ParkingRouter"

export default class ParkingRouterFactory {
  static readonly create = (): AbstractRouter => {
    // Conexión DB
    const mysqlDBC = MySqlDBC.getInstance()

    // Repositorios
    const sessionRepo = new MySQLParkingSessionRepository(mysqlDBC)
    if (!sessionRepo) {
      throw new Error("Failed to create MySQLParkingSessionRepository")
    }

    const customerVehicleRepo = new MySQLCustomerVehicleRepository(mysqlDBC)
    if (!customerVehicleRepo) {
      throw new Error("Failed to create CustomerVehicleRepository")
    }

    // Servicio
    const parkingService = new ParkingService(sessionRepo, customerVehicleRepo)
    if (!parkingService) {
      throw new Error("Failed to create ParkingService")
    }

    // Caso de uso
    const parkingUseCase = new ParkingUserCase(parkingService)
    if (!parkingUseCase) {
      throw new Error("Failed to create ParkingUserCase")
    }

    // Controladores
    const parkingController = new ParkingController(parkingUseCase)
    if (!parkingController) {
      throw new Error("Failed to create ParkingController")
    }

    const reportController = new ReportController(parkingUseCase)
    if (!reportController) {
      throw new Error("Failed to create ReportController")
    }

    // Router
    const parkingRouter = new ParkingRouter(parkingController, reportController)
    if (!parkingRouter) {
      throw new Error("Failed to create ParkingRouter")
    }

    return parkingRouter
  }
}
