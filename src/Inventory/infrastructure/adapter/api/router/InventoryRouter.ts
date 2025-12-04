import { AbstractRouter } from "../../../../../api/API"
import InventoryController from "../controller/InventoryController"

export default class InventoryRouter extends AbstractRouter {
  constructor(
    private readonly inventoryController: InventoryController
  ) {
    super('/inventory')
    this.routes()
  }

  protected override routes = (): void => {
    this.inventoryRoutes()
 
  }

  private readonly inventoryRoutes = (): void => {
    this.router.get('/items/stock/:sku', this.inventoryController.checkAvailability)
     this.router.post('/items/reservations/:sku', this.inventoryController.createStockReservation)
    this.router.post('/items', this.inventoryController.createItem)
    
  }

  
}
