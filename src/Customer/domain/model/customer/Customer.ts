
import Person, { PersonInterface } from "../../../../shared/base/domain/model/abstracts/Person";
import Address from "../address/Address";
import Email from "../email/Email";
import Identification from "../identification/Identification";


export default class Customer extends Person {

    private email: Email;
    private address: Address;
    private identification: Identification;
    isNull: boolean;

    constructor(customer: CustomerInterface) {

        if (
            !customer.email ||
            !customer.address ||
            !customer.identification 
        ) {
            throw new Error('Invalid movie data: Missing required fields.')
        }

        super(
            customer
        )
        this.address = customer.address;
        this.email = customer.email;
        this.identification = customer.identification
        this.isNull =false;

    }


    /**
     * Getter $email
     * @return {Email}
     */
	public get $email(): Email {
		return this.email;
	}

    /**
     * Getter $address
     * @return {Address}
     */
	public get $address(): Address {
		return this.address;
	}

    /**
     * Getter $identification
     * @return {Identification}
     */
	public get $identification(): Identification {
		return this.identification;
	}

    /**
     * Setter $email
     * @param {Email} value
     */
	public set $email(value: Email) {
		this.email = value;
	}

    /**
     * Setter $address
     * @param {Address} value
     */
	public set $address(value: Address) {
		this.address = value;
	}

    /**
     * Setter $identification
     * @param {Identification} value
     */
	public set $identification(value: Identification) {
		this.identification = value;
	}




}

export interface CustomerInterface extends PersonInterface {
    email: Email,
    address: Address,
    identification: Identification

}
