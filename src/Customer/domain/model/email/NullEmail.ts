import Email from "./Email";


export default class NullEmail extends Email{
    constructor(){
        super(
            {
                value: ""
            }

        )
        this.isNull = true;
    }


}