import NullObject from "../../../../shared/base/domain/model/interfaces/NullObject";
import ValueObject from "../../../../shared/base/domain/model/interfaces/ValueObject";

export default class Address implements ValueObject, NullObject{

    private  street: string;
    private town: string;
    private zip: string;
    isNull: boolean;
    
    constructor(location: AddressInterface){
        this.street = location.street
        this.town = location.town
        this.zip = location.zip
        this.isNull = false
        
    }
   

    
    readonly isDefined = (): boolean => { 
        if(!this.street || !this.town || this.zip){ return false; } 
        return true; 
    }

    readonly isValid = () : boolean =>{
        return true;

    }
    readonly equals = (other: ValueObject): boolean => {
        if (!(other instanceof Address)) return false;

        return (
            this.street === other.street &&
            this.town === other.town &&
            this.zip === other.zip
        );
    };
    
    readonly toString = ():  string =>{
        return `street: ${this.street}, town:${this.town}, zip:${this.zip}`

    }


    /**
     * Getter $street
     * @return {string}
     */
	public get $street(): string {
		return this.street;
	}

    /**
     * Getter $town
     * @return {string}
     */
	public get $town(): string {
		return this.town;
	}

    /**
     * Getter $zip
     * @return {string}
     */
	public get $zip(): string {
		return this.zip;
	}

    /**
     * Setter $street
     * @param {string} value
     */
	public set $street(value: string) {
		this.street = value;
	}

    /**
     * Setter $town
     * @param {string} value
     */
	public set $town(value: string) {
		this.town = value;
	}

    /**
     * Setter $zip
     * @param {string} value
     */
	public set $zip(value: string) {
		this.zip = value;
	}



}

export interface AddressInterface{ 
    street: string
    town: string
    zip: string


}