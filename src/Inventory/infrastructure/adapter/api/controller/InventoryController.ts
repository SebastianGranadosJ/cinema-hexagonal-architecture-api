import { AbstractController } from "../../../../../api/API";
import { Request, Response } from 'express'
import Item, { ItemInterface } from "../../../../domain/model/Item/Item";
import InvetoryUseCasePort from "../../../../domain/port/driver/usecase/InvetoryUseCasePort";

export default class InventoryController extends AbstractController {
    constructor(private readonly inventoryUseCase: InvetoryUseCasePort) {
        super()
    }


    // POST inventory/items

    readonly createItem = async (req: Request, res: Response): Promise<void> => {
        const itemData = req.body

        const requiredFields = [
            'sku',
            'itemId',
            'units',
            'priceByUnit',
            'location',
            'type'
        ]

        for (const field of requiredFields) {
            if (!itemData[field]) {
                res.status(this.HTTPStatusCode.BAD_REQUEST).json({
                    error: `${field.charAt(0).toUpperCase() + field.slice(1)
                        } is required`,
                })
                return
            }
        }

        const item = itemData as ItemInterface

        try {
            const itemCreated = await this.inventoryUseCase.add(new Item(item))

            if (itemCreated.isNull) {
                res.status(this.HTTPStatusCode.BAD_REQUEST).json(itemCreated)
                return
            }

            res.status(this.HTTPStatusCode.CREATED).json(itemCreated)
        } catch (error) {
            console.error('Internal Server Error: create ', error)
            res
                .status(this.HTTPStatusCode.INTERNAL_SERVER_ERROR)
                .json({ error: 'Internal Server Error' })
        }
    }


    //GET /api/inventory/items/stock/:sku

    readonly checkAvailability = async (req: Request, res: Response): Promise<void> => {
        const { sku } = req.params
        if (!sku) {
            res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: 'Bad Request' })
            return
        }

        try {
            const availableQuantity = await this.inventoryUseCase.checkAvailabilty(sku)

            if (availableQuantity === -1) {
                res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: 'Item doesnt exist' })
                return

            }

            res.status(this.HTTPStatusCode.OK).json(
                {
                    "availableQuantity": availableQuantity
                }
            )
            return
        } catch (error) {
            console.error('Internal Server Error: getById ', error)
            res
                .status(this.HTTPStatusCode.INTERNAL_SERVER_ERROR)
                .json({ error: 'Internal Server Error' })
        }
    }

     // POST /api/inventory/items/reservations/:sku

    readonly createStockReservation = async (req: Request, res: Response): Promise<void> => {
        const { sku } = req.params
        if (!sku) {
            res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: 'Bad Request' })
            return
        }
        console.log("x")
        const { requestedQuantity } = req.body
        const stock = Number(requestedQuantity ?? 0)

        if (!requestedQuantity || stock === 0 || !Number.isInteger(stock)) {
            console.log(requestedQuantity)
            res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: 'Bad Request' })
            return
        }

        try {
            const result = await this.inventoryUseCase.reserveStock(sku,requestedQuantity )

            if (!result) {
                res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: 'It was not posible to create the reservation. ' })
                return

            }

            res.status(this.HTTPStatusCode.OK).json(
                {
                    "reservedStock": stock
                }
            )
            return
        } catch (error) {
            console.error('Internal Server Error: getById ', error)
            res
                .status(this.HTTPStatusCode.INTERNAL_SERVER_ERROR)
                .json({ error: 'Internal Server Error' })
        }
    }




}