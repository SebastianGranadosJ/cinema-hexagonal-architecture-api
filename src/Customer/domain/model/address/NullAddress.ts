import Address from "./Address";

export default class NullAddress extends Address{
    constructor (){
        super({
            street: "",
            town: '',
            zip: ""
        }


        )

    }


}