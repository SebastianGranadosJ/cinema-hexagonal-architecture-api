import CustomerServiceInterface from "../../domain/interfaces/CustomerServiceInterface"
import Customer from "../../domain/model/customer/Customer"
import CustomerRepository from "../../infrastructure/adapter/repository/CustomerRepository"

export default class CustomerService implements CustomerServiceInterface {


    constructor(private readonly customerRepo: CustomerRepository) { }

    readonly getCustomer = async (id: string): Promise<Customer> => {
        return await this.customerRepo.getCustomerByID(id)

    }
}