import ItemReservation from "./ItemReservation";

export default class NullItemReservation extends ItemReservation{

    constructor(){
        super({
            sku: "",
            amount: 0

        }
            

        )

    }

}