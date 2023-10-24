import { Mapper } from "../core/infra/Mapper";
import { Campus } from '../domain/campus';
import ICampusDTO from '../dto/ICampusDTO';
import { ICampusPersistence } from '../dataschema/ICampusPersistence';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IFloorDTO from "../dto/IRoomDTO";
import { Floor } from "../domain/floor";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";

export class FloorMap extends Mapper<Floor> {
  public static toDTO(floor: Floor): IFloorDTO {
    return {
      id: floor.id.toString(),
      name: floor.name,
      rooms: floor.rooms.map(room => room.roomId.toString())
    }as IFloorDTO;
  }

  public static toDomain(raw: any): Floor {
    const floorOrError = Floor.create(
      {
          name: raw.name,
          rooms: raw.rooms || []
      },
      new UniqueEntityID(raw._id.toString())
    );

    floorOrError.isFailure ? console.log(floorOrError.error) : '';
    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }

  public static toPersistence(floor: Floor): IFloorPersistence {
    const a = {
      _id: floor.id.toString(),
      name: floor.name,
      rooms: floor.rooms.map(room => room.roomId.toString())
    }
    return a;
  } 

}
