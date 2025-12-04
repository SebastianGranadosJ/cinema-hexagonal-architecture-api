import Customer from "../../../../model/customer/Customer";



export default interface CustomerRepositoryPort{
    
    getCustomerByID(id: string): Promise<Customer>
    

}