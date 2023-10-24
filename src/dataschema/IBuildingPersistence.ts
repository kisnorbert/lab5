import { Elevator } from "../domain/elevator";
import { Floor } from "../domain/floor";

export interface IBuildingPersistence {
    _id: string;
    name: string;
    elevator?: string;
    floors: string[];
  }