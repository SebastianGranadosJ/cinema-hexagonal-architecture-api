import CustomerServiceInterface from "../../domain/interfaces/CustomerServiceInterface";
import Customer from "../../domain/model/customer/Customer";
import CustomerUserCasePort from "../../domain/port/driver/usecase/CustomerUseCasePort";

export default class CustomerUseCase implements CustomerUserCasePort {

    constructor(private readonly customerService: CustomerServiceInterface) { }

    readonly getById = async (id: string): Promise<Customer> => {
        return await this.customerService.getCustomer(id)

    }


}