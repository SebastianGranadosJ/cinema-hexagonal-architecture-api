import NullObject from "../../../../shared/base/domain/model/interfaces/NullObject";
import VehicleType from "./VehicleType";

export default class Vehicle implements NullObject {
    private numberPlate: string;
    private vehicleType: VehicleType

    isNull: boolean;

    constructor(vehicle: VehicleInterface) {
        this.numberPlate = vehicle.numberPlate;
        this.vehicleType = vehicle.vehicleType;
        this.isNull = false;
    }


    getNumberPlate = (): string => {
        return this.numberPlate
    }

    getVehicleType = (): VehicleType => {
        return this.vehicleType
    }


    setNumberPlate = (numberPLate: string): void => {
        this.numberPlate = numberPLate
    }

    setVehicleType = (vehicleType: VehicleType): void => {
        this.vehicleType = vehicleType
    }



}


export interface VehicleInterface {
    numberPlate: string,
    vehicleType: VehicleType
}