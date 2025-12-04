import NullItem from "../Item/NullItem";
import Inventory from "./Inventory";

export default class NullInventory extends Inventory{
    constructor(){
        super({
            id: "",
            items: [new NullItem()]

        }
        
        )
        
    }


}