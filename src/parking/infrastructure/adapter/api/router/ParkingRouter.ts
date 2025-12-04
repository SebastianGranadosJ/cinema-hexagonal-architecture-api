import { AbstractRouter } from "../../../../../api/API"
import ParkingController from "../controller/ParkingController"
import ReportController from "../controller/ReportControllet"

export default class ParkingRouter extends AbstractRouter {
  constructor(
    private readonly parkingController: ParkingController,
    private readonly reportController: ReportController
  ) {
    super("/api/v1.0/estacionamiento") // prefijo base para todas las rutas
    this.routes()
  }

  protected override routes = (): void => {
    this.entryRoutes()
    this.exitRoutes()
    this.reportRoutes()
  }

  // POST http://localhost:1880/api/v1.0/estacionamiento/ingresos
  private readonly entryRoutes = (): void => {
    this.router.post("/ingresos", this.parkingController.registerEntry)
  }

  // POST http://localhost:1880/api/v1.0/estacionamiento/salidas
  private readonly exitRoutes = (): void => {
    this.router.post("/salidas", this.parkingController.registerExit)
  }

  // GET http://localhost:1880/api/v1.0/estacionamiento/reportes/balance-diario?fecha=2025-09-15
  private readonly reportRoutes = (): void => {
    this.router.get("/reportes/balance-diario", this.reportController.getDayliBalance)
  }
}
