import { Mapper } from "../core/infra/Mapper";
import { Room } from '../domain/room';
import IRoomDTO from '../dto/IRoomDTO';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Document, Model } from "mongoose";

export class RoomMap extends Mapper<Room> {
    public static toDTO( room: Room): IRoomDTO {
        return {
          id: room.id.toString(),
          name: room.name,
        } as IRoomDTO;
      }

      public static toDomain (room: any | Model<IRoomPersistence & Document> ): Room {
        const roomOrError = Room.create(
          room,
          new UniqueEntityID(room.domainId)
        );

    roomOrError.isFailure ? console.log(roomOrError.error) : '';
    return roomOrError.isSuccess ? roomOrError.getValue() : null;
  }

  public static toPersistence (room: Room): any {
    return {
      domainId: room.id.toString(),
      name: room.name
    }
  }
}
