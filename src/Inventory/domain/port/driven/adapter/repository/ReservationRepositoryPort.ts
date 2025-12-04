import ItemReservation from "../../../../model/Item/ItemReservation";



export default interface ReservationRepositoryPort{
    createReservation(ItemReservation:ItemReservation): Promise<ItemReservation>

}