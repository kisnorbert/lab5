import { Building } from "../domain/building";
import { Floor } from "../domain/floor";

export interface IElevatorPersistence {
    _id: string;
    building?: string;
    elevatorFloors?: string[];
  }