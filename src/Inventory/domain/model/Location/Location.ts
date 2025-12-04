import NullObject from "../../../../shared/base/domain/model/interfaces/NullObject";
import ValueObject from "../../../../shared/base/domain/model/interfaces/ValueObject";

export default class Location implements ValueObject, NullObject{

    private readonly id: string;
    private rack: string;
    private tray: string;
    isNull: boolean;
    constructor(location: LocationInterface){
        this.id = location.id
        this.rack = location.rack
        this.tray = location.tray
        this.isNull = false
        
    }
   

    
    readonly isDefined = (): boolean => { 
        if(!this.id || !this.rack || this.tray){ return false; } 
        return true; 
    }

    readonly isValid = () : boolean =>{
        return true;

    }
    readonly equals = (other: ValueObject): boolean => {
        if (!(other instanceof Location)) return false;

        return (
            this.id === other.id &&
            this.rack === other.rack &&
            this.tray === other.tray
        );
    };
    
    readonly toString = ():  string =>{
        return `id: ${this.id}, rack:${this.rack}, tray:${this.tray}`

    }



    /**
     * Getter $id
     * @return {string}
     */
	public get $id(): string {
		return this.id;
	}


    /**
     * Getter $rack
     * @return {string}
     */
	public get $rack(): string {
		return this.rack;
	}

    /**
     * Getter $tray
     * @return {string}
     */
	public get $tray(): string {
		return this.tray;
	}

    /**
     * Setter $rack
     * @param {string} value
     */
	public set $rack(value: string) {
		this.rack = value;
	}

    /**
     * Setter $tray
     * @param {string} value
     */
	public set $tray(value: string) {
		this.tray = value;
	}




}

export interface LocationInterface{ 
    id: string
    rack: string
    tray: string


}