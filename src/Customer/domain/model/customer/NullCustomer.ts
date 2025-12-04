import NullAddress from "../address/NullAddress";
import NullEmail from "../email/NullEmail";
import NullIdentification from "../identification/NullIdentification";
import Customer from "./Customer";

export default class NullCustomer extends Customer {

    constructor() {
        super(
            {
                id: '',
                names: '',
                surnames: '',
                email: new NullEmail(),
                address: new NullAddress(),
                identification: new NullIdentification(),
                
            }
           
        )

         this.isNull = true


    }



}