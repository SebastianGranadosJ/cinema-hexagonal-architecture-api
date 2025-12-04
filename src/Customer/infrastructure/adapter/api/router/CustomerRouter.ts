import { AbstractRouter } from "../../../../../api/API"
import CustomerController from "../controller/CustomerController"


export default class CustomerRouter extends AbstractRouter {
  constructor(
    private readonly customerController: CustomerController
  ) {
    super('/customers-data')
    this.routes()
  }

  protected override routes = (): void => {
    this.customerRoutes()
 
  }

  private readonly customerRoutes = (): void => {
    this.router.get('/customers/:id', this.customerController.getCustomerById)
    
  }

  
}
