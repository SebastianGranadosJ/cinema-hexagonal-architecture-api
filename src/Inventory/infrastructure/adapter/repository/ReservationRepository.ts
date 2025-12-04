import LocalJsonDBC from "../../../../shared/repository/infrastructure/dbc/local/json/LocalJsonDBC";
import ItemReservation from "../../../domain/model/Item/ItemReservation";
import NullItemReservation from "../../../domain/model/Item/NullItemReservation";
import ReservationRepositoryPort from "../../../domain/port/driven/adapter/repository/ReservationRepositoryPort";

export default class ReservationRepository implements ReservationRepositoryPort {

     constructor(private readonly localJsonDBC: LocalJsonDBC<ItemReservation>) { }

    readonly createReservation = async (item: ItemReservation): Promise<ItemReservation> => {
    
            try {
                if (! await this.localJsonDBC.write(item)) {
                    return new NullItemReservation()
                }
    
                return item;
    
            } catch (error) {
                console.error("Error creating products: ", error)
                return new NullItemReservation()
            }
    
        }
}