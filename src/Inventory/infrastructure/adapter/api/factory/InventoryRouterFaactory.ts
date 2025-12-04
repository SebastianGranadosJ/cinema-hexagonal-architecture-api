import LocalJsonDBC from "../../../../../shared/repository/infrastructure/dbc/local/json/LocalJsonDBC";
import InventoryService from "../../../../application/service/InventoryService";
import InventoryUseCase from "../../../../application/usecase/InvetoryUseCase";
import Item from "../../../../domain/model/Item/Item";
import ItemReservation from "../../../../domain/model/Item/ItemReservation";
import InventoryRepository from "../../repository/InventoryRepository";
import ReservationRepository from "../../repository/ReservationRepository";
import InventoryController from "../controller/InventoryController";
import InventoryRouter from "../router/InventoryRouter";


export default class InventoryRouterFactory {
  static readonly create = (): InventoryRouter => {
    const dbReservation = new LocalJsonDBC<ItemReservation>(
      './database/reservation.json',
      ItemReservation
    );
    if (!dbReservation) {
      throw new Error('Failed to create Reservation DBC');
    }

    const dbInventory = new LocalJsonDBC<Item>(
      './database/inventory.json',
      Item
    );
    if (!dbInventory) {
      throw new Error('Failed to create Inventory DBC');
    }

    const reservationRepository = new ReservationRepository(dbReservation);
    if (!reservationRepository) {
      throw new Error('Failed to create ReservationRepository');
    }

    const inventoryRepository = new InventoryRepository(dbInventory);
    if (!inventoryRepository) {
      throw new Error('Failed to create InventoryRepository');
    }

    const inventoryService = new InventoryService(
      inventoryRepository,
      reservationRepository
    );
    if (!inventoryService) {
      throw new Error('Failed to create InventoryService');
    }

    const inventoryUseCase = new InventoryUseCase(inventoryService);
    if (!inventoryUseCase) {
      throw new Error('Failed to create InventoryUseCase');
    }

    const inventoryController = new InventoryController(inventoryUseCase);
    if (!inventoryController) {
      throw new Error('Failed to create InventoryController');
    }

    const inventoryRouter = new InventoryRouter(inventoryController);
    if (!inventoryRouter) {
      throw new Error('Failed to create InventoryRouter');
    }

    return inventoryRouter;
  };
}
