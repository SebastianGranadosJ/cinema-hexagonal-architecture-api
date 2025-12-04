// CustomerRouterFactory.ts

import LocalJsonDBC from "../../../../../shared/repository/infrastructure/dbc/local/json/LocalJsonDBC";
import CustomerService from "../../../../application/service/CustomerService";
import CustomerUseCase from "../../../../application/usecase/CustomerUserCase";
import Customer from "../../../../domain/model/customer/Customer";
import CustomerRepository from "../../repository/CustomerRepository";
import CustomerController from "../controller/CustomerController";
import CustomerRouter from "../router/CustomerRouter";


export default class CustomerRouterFactory {
  static readonly create = (): CustomerRouter => {
    const dbCustomer = new LocalJsonDBC<Customer>(
      './database/customer.json',
      Customer
    );
    if (!dbCustomer) {
      throw new Error('Failed to create Customer DBC');
    }

    const customerRepo = new CustomerRepository(dbCustomer);
    if (!customerRepo) {
      throw new Error('Failed to create CustomerRepository');
    }

    const customerService = new CustomerService(customerRepo);
    if (!customerService) {
      throw new Error('Failed to create CustomerService');
    }

    const customerUseCase = new CustomerUseCase(customerService);
    if (!customerUseCase) {
      throw new Error('Failed to create CustomerUseCase');
    }

    const customerController = new CustomerController(customerUseCase);
    if (!customerController) {
      throw new Error('Failed to create CustomerController');
    }

    const customerRouter = new CustomerRouter(customerController);
    if (!customerRouter) {
      throw new Error('Failed to create CustomerRouter');
    }

    return customerRouter;
  };
}
