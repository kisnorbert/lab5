import { Floor } from "../domain/floor";

export interface IBuildingPersistence {
    _id: string;
    name: string;
    floors: string[];
  }