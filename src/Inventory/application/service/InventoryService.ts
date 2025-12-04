import InventoryServiceInterface from "../../domain/interfaces/InventoryServiceInterface";
import Item from "../../domain/model/Item/Item";
import ItemReservation from "../../domain/model/Item/ItemReservation";
import InventoryRepository from "../../infrastructure/adapter/repository/InventoryRepository";
import ReservationRepository from "../../infrastructure/adapter/repository/ReservationRepository";



export default class InventoryService implements InventoryServiceInterface {


    constructor(private readonly inventoryRepo: InventoryRepository,
        private readonly reservationRepo: ReservationRepository) { }

    readonly createItem = async (item: Item): Promise<Item> => {

        return await this.inventoryRepo.createItem(item)


    }
    readonly getItem = async (sku: string): Promise<Item> => {
        return await this.inventoryRepo.getItem(sku)

    }
    readonly updateItem = async (sku: string, update: Item): Promise<Item> => {
        return await this.inventoryRepo.updateItem(sku, update)

    }

    readonly createReservation = async (itemReservation: ItemReservation): Promise<ItemReservation> => {
        return await this.reservationRepo.createReservation(itemReservation)
    }


}