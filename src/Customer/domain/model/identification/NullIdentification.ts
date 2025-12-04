import Identification from "./Identification";



export default class NullIdentification extends Identification{
    constructor(){
        super(
            {
                value: ""
            }

        )
        this.isNull = true;
    }


}