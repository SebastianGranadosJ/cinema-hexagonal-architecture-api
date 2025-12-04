import { AbstractController } from "../../../../../api/API";
import ParkingSession from "../../../../domain/model/ParkingSession/ParkingSession";
import VehicleType from "../../../../domain/model/Vehicle/VehicleType";
import ParkingUserCasePort from "../../../../domain/port/driver/usecase/ParkingUserCasePort";
import { Request, Response } from "express"

export default class ParkingController extends AbstractController {
    constructor(private readonly parkingUseCase: ParkingUserCasePort) {
        super()
    }

    readonly registerEntry = async (req: Request, res: Response): Promise<void> => {
        try {
            const { placa, tipo } = req.body

            if (!placa) {
                res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: "La placa es obligatoria" })
                return
            }

            // Determinar tipo de vehículo (si no llega, lo dejamos UNKNOWN)
            const vehicleType: VehicleType = tipo && VehicleType[tipo as keyof typeof VehicleType]
                ? VehicleType[tipo as keyof typeof VehicleType]
                : VehicleType.UNKNOWN

            const session: ParkingSession = await this.parkingUseCase.registerEntry(
                placa,
                vehicleType
            )

            if (session.isNull) {
                res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: "No se pudo registrar el ingreso (plazas llenas o datos inválidos)" })
                return
            }

            const responseBody = {
                registroId: session.getRecordId(),
                placa: session.getVehicle().getNumberPlate(),
                horaIngreso: session.getEntryDateTime().toISOString(),
            }

            res.status(this.HTTPStatusCode.CREATED).json(responseBody)
        } catch (error) {
            console.error("Error en ParkingController.registerEntry:", error)
            res.status(500).json({ error: "Error interno del servidor" })
        }
    }

    readonly registerExit = async (req: Request, res: Response): Promise<void> => {
        try {
            const { placa } = req.body
            if (!placa) {
                res.status(400).json({ error: "La placa es obligatoria" })
                return
            }

            const session: ParkingSession = await this.parkingUseCase.registerExit(placa)

            if (session.isNull) {
                res.status(404).json({ error: "No se encontró una sesión activa para esta placa" })
                return
            }

            res.status(this.HTTPStatusCode.OK).json({
                placa: session.getVehicle().getNumberPlate(),
                tipo: session.getVehicle().getVehicleType(),
                horaIngreso: session.getEntryDateTime(),
                horaSalida: session.getExitDateTime(),
                tiempoEstacionadoMinutos: session.getParkedMinutes(),
                montoAPagar: session.getAmountPaid(),
            })
        } catch (error) {
            console.error("Error en registerExit:", error)
            res.status(500).json({ error: "Error interno en el servidor" })
        }
    }

    


}
