import { AbstractController } from "../../../../../api/API"
import CustomerUserCasePort from "../../../../domain/port/driver/usecase/CustomerUseCasePort"

import { Request, Response } from "express"


export default class CustomerController extends AbstractController {
    constructor(private readonly inventoryUseCase: CustomerUserCasePort) {
        super()
    }


   readonly  getCustomerById = async ( req:Request, res:Response): Promise<void> =>{

        const id = req.params["id"];

        if(!id){
            res.status(this.HTTPStatusCode.BAD_REQUEST).json({message: "Invalid customer ID"})
            return;
        }

        const customer = await this.inventoryUseCase.getById(id)
        

        if(!customer){
            res.status(this.HTTPStatusCode.BAD_REQUEST). json({message: "No customer found"})
            return;
        }

        res.status(this.HTTPStatusCode.OK).json(customer)

    }

}
