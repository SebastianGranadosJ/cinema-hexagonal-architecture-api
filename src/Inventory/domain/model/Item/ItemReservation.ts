export default class ItemReservation{
    private sku : string;
    private amount: number;

    constructor(item: ItemReservationInterface){
         if (
            !Number.isInteger(item.amount)
        ) {
            throw new Error('Invalid amount data.')
        }
        this.sku = item.sku;
        this.amount = item.amount


    }


    /**
     * Getter $sku
     * @return {string}
     */
	public get $sku(): string {
		return this.sku;
	}

    /**
     * Getter $amount
     * @return {number}
     */
	public get $amount(): number {
		return this.amount;
	}

    /**
     * Setter $sku
     * @param {string} value
     */
	public set $sku(value: string) {
		this.sku = value;
	}

    /**
     * Setter $amount
     * @param {number} value
     */
	public set $amount(value: number) {
		this.amount = value;
	}
    

}


export interface ItemReservationInterface{
    sku : string,
    amount: number

}