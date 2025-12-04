import Customer from "../model/customer/Customer";

export default interface CustomerServiceInterface {
    getCustomer(id: string): Promise<Customer>

}