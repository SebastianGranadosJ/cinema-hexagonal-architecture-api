import LocalJsonDBC from "../../../../shared/repository/infrastructure/dbc/local/json/LocalJsonDBC";
import Item from "../../../domain/model/Item/Item";
import NullItem from "../../../domain/model/Item/NullItem";
import InventoryRepositoryPort from "../../../domain/port/driven/adapter/repository/InventoryRepositoryPort";


export default class InventoryRepository implements InventoryRepositoryPort {

    constructor(private readonly localJsonDBC: LocalJsonDBC<Item>) { }

    readonly createItem = async (item: Item): Promise<Item> => {

        try {
            if (! await this.localJsonDBC.write(item)) {
                return new NullItem()
            }

            return item;

        } catch (error) {
            console.error("Error creating products: ", error)
            return new NullItem()
        }

    }
    readonly getItem = async (sku: string): Promise<Item> => {

        try {
            const items= await this.localJsonDBC.read();
            if (!items) {
                return new NullItem()
            }
            
            const item = items.find(p => p.$sku == sku)
            
            if (!item) {
                return new NullItem();
            }
            return item;



        } catch (error) {
            console.error("Error retrineving items: ", error)
            return new NullItem()
        }

    }
    readonly updateItem = async (sku: string, updates: Item): Promise<Item> => {
        try {
            const items = await this.localJsonDBC.read();

            const index = items.findIndex(element => element.$sku  === sku);

            if (index === -1) return new NullItem();

            items[index] = Object.assign({}, items[index], updates);

            await this.localJsonDBC.overwrite(items);

            return items[index] ?? new NullItem();

        }catch(error){
            console.error("Error updating item: ", error)
            return new NullItem()
        }
        
    }



}