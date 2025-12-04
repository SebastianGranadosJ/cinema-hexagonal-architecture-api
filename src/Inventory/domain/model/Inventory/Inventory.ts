import Item from "../Item/Item";

export default class Inventory {

    private readonly id: string;
    private items: Item[];

    constructor(inventory: InventoryInterface){
        this.id = inventory.id;
        this.items = inventory.items

    }



    /**
     * Getter $items
     * @return {Item[]}
     */
    public get $items(): Item[] {
        return this.items;
    }

    /**
     * Setter $items
     * @param {Item[]} value
     */
    public set $items(value: Item[]) {
        this.items = value;
    }

    /**
     * Getter $id
     * @return {string}
     */
    public get $id(): string {
        return this.id;
    }

}

export interface InventoryInterface{

    id: string
    items: Item[]

}