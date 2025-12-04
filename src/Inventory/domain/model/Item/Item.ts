import NullObject from "../../../../shared/base/domain/model/interfaces/NullObject";
import Location from "../Location/Location";
import Type from "./Type";

export default class Item implements NullObject{
    
    private readonly sku: string;
    private itemId: string;
    private units: number;
    private priceByUnit: number;
    private location: Location;
    private type: Type;
    isNull: boolean;

    constructor(item: ItemInterface) {
        if (
            !item.location
        ) {
            throw new Error('Invalid movie data: Missing required fields.')
        }

        this.sku = item.sku;
        this.itemId = item.itemId;
        this.units = item.units;
        this.priceByUnit = item.priceByUnit
        this.location = item.location
        this.type = item.type
        this.isNull = false
    }
    


    /**
     * Getter $type
     * @return {Type}
     */
	public get $type(): Type {
		return this.type;
	}

    /**
     * Setter $type
     * @param {Type} value
     */
	public set $type(value: Type) {
		this.type = value;
	}

    /**
     * Getter $location
     * @return {Location}
     */
    public get $location(): Location {
        return this.location;
    }

    /**
     * Setter $location
     * @param {Location} value
     */
    public set $location(value: Location) {
        this.location = value;
    }

    /**
     * Getter $sku
     * @return {string}
     */
    public get $sku(): string {
        return this.sku;
    }

    /**
     * Getter $itemId
     * @return {string}
     */
    public get $itemId(): string {
        return this.itemId;
    }

    /**
     * Getter $units
     * @return {number}
     */
    public get $units(): number {
        return this.units;
    }

    /**
     * Getter $priceByUnit
     * @return {number}
     */
    public get $priceByUnit(): number {
        return this.priceByUnit;
    }

    /**
     * Setter $itemId
     * @param {string} value
     */
    public set $itemId(value: string) {
        this.itemId = value;
    }

    /**
     * Setter $units
     * @param {number} value
     */
    public set $units(value: number) {
        this.units = value;
    }

    /**
     * Setter $priceByUnit
     * @param {number} value
     */
    public set $priceByUnit(value: number) {
        this.priceByUnit = value;
    }

}

export interface ItemInterface {
    sku: string
    itemId: string
    units: number
    priceByUnit: number
    location: Location
    type: Type
}