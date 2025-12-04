import NullObject from "../../../../shared/base/domain/model/interfaces/NullObject";
import ValueObject from "../../../../shared/base/domain/model/interfaces/ValueObject";

export default class Identification implements ValueObject, NullObject {
    private value: string;
    isNull: boolean;

    constructor(identification: IdentificationInterface){
        this.value = identification.value 
        this.isNull = false
    }
    

    readonly isDefined = (): boolean => {
        if (!this.value) { return false; }
        return true;
    }

    readonly isValid = (): boolean => {
        return true;

    }
    readonly equals = (other: ValueObject): boolean => {
        if (!(other instanceof Identification)) return false;

        return (
            this.value === other.value
        );
    };

    readonly toString = (): string => {
        return `Identification: ${this.value}`

    }

    
    /**
     * Getter $value
     * @return {string}
     */
    public get $value(): string {
        return this.value;
    }

    /**
     * Setter $value
     * @param {string} value
     */
    public set $value(value: string) {
        this.value = value;
    }
    

}

export interface IdentificationInterface{
    value: string


}