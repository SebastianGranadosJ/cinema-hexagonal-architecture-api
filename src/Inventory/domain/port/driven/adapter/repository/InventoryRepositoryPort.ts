import Item from "../../../../model/Item/Item"


export default interface InventoryRepositoryPort{
    createItem(item: Item): Promise<Item>
    getItem(sku: string): Promise<Item>
    updateItem(sku: string ,item:Item): Promise<Item>

}