import Item from "../model/Item/Item";
import ItemReservation from "../model/Item/ItemReservation";

export default interface InventoryServiceInterface{
    createItem(item: Item): Promise<Item>
    getItem(sku: string): Promise<Item>
    updateItem(sku: string ,item:Item): Promise<Item>
    createReservation(reservation: ItemReservation): Promise<ItemReservation>

}