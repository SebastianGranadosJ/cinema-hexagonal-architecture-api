


import ServerFactory from './api/infrastructure/adapter/api/factory/ServerFactory'
import CustomerRouterFactory from './Customer/infrastructure/adapter/api/factory/CustomerRouterFactory'
import InventoryRouterFactory from './Inventory/infrastructure/adapter/api/factory/InventoryRouterFaactory'
import MovieRouterFactory from './movie/infrastructure/adapter/api/factory/MovieRouterFactory'
import ParkingRouterFactory from './parking/infrastructure/adapter/api/factory/ParkingRouterFactory'
import MigrationRunner from './parking/infrastructure/adapter/repository/mysql-repository/migrationrunner/MigrationRunner'


// Routers

const migrate = new MigrationRunner();
migrate.migrateAll()
const customerRouter = CustomerRouterFactory.create()
const inventoryRouter = InventoryRouterFactory.create()
const movieRouter = MovieRouterFactory.create()
const parkingRouter = ParkingRouterFactory.create()

// Server
const server = ServerFactory.create([
  inventoryRouter,
  customerRouter,
  movieRouter,
  parkingRouter,
])

server.start()
