import { Building } from "../domain/building";

export interface ICampusPersistence {
    _id: string;
    name: string;
    buildings?: string[];
  }