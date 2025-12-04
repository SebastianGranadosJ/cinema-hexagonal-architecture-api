import { AbstractController } from "../../../../../api/API"
import DayliReport from "../../../../domain/model/DayliReport/DayliReport"
import ParkingSession from "../../../../domain/model/ParkingSession/ParkingSession"
import ParkingUserCasePort from "../../../../domain/port/driver/usecase/ParkingUserCasePort"
import { Request, Response } from "express"

export default class ReportController extends AbstractController{
  constructor(private readonly parkingUseCase: ParkingUserCasePort) {
      super()
  }

  readonly getDayliBalance = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fecha } = req.query
      if (!fecha || typeof fecha !== "string") {
        res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: "El parámetro 'fecha' es obligatorio y debe ser un string" })
        return
      }

      const date = new Date(fecha)
      if (isNaN(date.getTime())) {
        res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: "La fecha no tiene un formato válido" })
        return
      }

      const report: DayliReport = await this.parkingUseCase.generateDayliBalance(date)

      res.status(this.HTTPStatusCode.OK).json({
        fechaReporte: report.getReportDate(),
        recaudoTotalDelDia: report.getTotalEarnings(),
        detalleVehiculos: report.getRecords().map((record: ParkingSession) => ({
          placa: record.getVehicle().getNumberPlate(),
          tipo: record.getVehicle().getVehicleType(),
          esClienteTienda: record.getIsClient(),
          montoPagado: record.getAmountPaid(),
        })),
      })
    } catch (error) {
      console.error("Error en getDayliBalance:", error)
      res.status(this.HTTPStatusCode.BAD_GATEWAY).json({ error: "Error interno en el servidor" })
    }
  }
}
