

import InventoryServiceInterface from "../../domain/interfaces/InventoryServiceInterface";
import Item from "../../domain/model/Item/Item";
import ItemReservation from "../../domain/model/Item/ItemReservation";
import NullItem from "../../domain/model/Item/NullItem";
import InvetoryUseCasePort from "../../domain/port/driver/usecase/InvetoryUseCasePort";



export default class InventoryUseCase implements InvetoryUseCasePort{

    constructor(private readonly inventoryService: InventoryServiceInterface ){}


    readonly add = async (item: Item) : Promise<Item> =>{

        if(!item){
            return Promise.resolve(new NullItem())
        }

        return await this.inventoryService.createItem(item)

    }
    readonly checkAvailabilty = async (sku: string) :  Promise<number>=> {
        const item: Item = await this.inventoryService.getItem(sku);

        if(item.isNull){
            return Promise.resolve(-1)
        }

        return Promise.resolve(item.$units)
    }
    readonly reserveStock = async (sku: string, stock: number) : Promise<boolean> =>{
        const item: Item = await this.inventoryService.getItem(sku);

        if(item.isNull){
            return Promise.resolve(false)
        }

        if(item.$units < stock){
            return Promise.resolve(false)
        }

        item.$units = item.$units - stock;

        await this.inventoryService.updateItem(sku, item);

        await this.inventoryService.createReservation( new ItemReservation({
            sku: sku,
            amount: stock

        }))

        return Promise.resolve(true)
    }

    
}