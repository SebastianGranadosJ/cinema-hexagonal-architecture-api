import LocalJsonDBC from "../../../../shared/repository/infrastructure/dbc/local/json/LocalJsonDBC";
import Customer from "../../../domain/model/customer/Customer";
import NullCustomer from "../../../domain/model/customer/NullCustomer";
import CustomerRepositoryPort from "../../../domain/port/driven/adapter/repository/CustomerRepositoryPort";

export default class CustomerRepository implements CustomerRepositoryPort {

    constructor(private readonly localJsonDBC: LocalJsonDBC<Customer>) { }

    readonly getCustomerByID = async (id: string): Promise<Customer> => {

        try {
            const customers = await this.localJsonDBC.read();
            console.log(customers)
            
            if (!customers) {
                return new NullCustomer()
            }
            
            const customer = customers.find(p => p.getId() == id)
            
            if (!customer) {
                return new NullCustomer()
            }
            return customer;



        } catch (error) {
            console.error("Error retrineving Customer: ", error)
            return new NullCustomer()
        }

    }
}