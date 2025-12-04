import Item from "../../../model/Item/Item"

export default interface InvetoryUseCasePort {
    add: (item: Item) => Promise<Item>
    checkAvailabilty: (sku: string) => Promise<number>
    reserveStock: (sku: string, stock: number) => Promise<boolean>

}
