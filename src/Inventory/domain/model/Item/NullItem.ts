import NullLocation from "../Location/NullLocation";

import Item from "./Item";
import Type from "./Type";


export default class NullItem extends Item {
    constructor() {
        super({
            sku: "",
            itemId: "",
            units: 0,
            priceByUnit: 0,
            location: new NullLocation(),
            type: Type.UNKNOWN
        }
        )
        this.isNull = true;

    }


}