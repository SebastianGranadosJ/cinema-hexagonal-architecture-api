import Customer from "../../../model/customer/Customer";


export default interface CustomerUserCasePort {
    getById(id: string): Promise<Customer>

}