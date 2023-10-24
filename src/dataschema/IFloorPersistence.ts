import { Room } from "../domain/room";

export interface IFloorPersistence {
    _id: string;
    name: string;
    rooms: string[];
  }