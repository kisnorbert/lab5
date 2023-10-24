import { Mapper } from "../core/infra/Mapper";
import { Building } from '../domain/building';
import IBuildingDTO from '../dto/IBuildingDTO';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import elevatorSchema from "../persistence/schemas/elevatorSchema";

export class BuildingMap extends Mapper<Building> {
  
  public static toDTO(building: Building): IBuildingDTO {
    return {
      id: building.id.toString(),
      name: building.name,
      floors: building.floors.map(floor => floor.floorId.toString())
      // TODO map elevator here
    }as IBuildingDTO;
  }


  public static toDomain(raw: any): Building {
    const buildingOrError = Building.create(
      {
        name: raw.name,
        floors: raw.floors || [],
        elevator: raw.elevator || []
      },
      new UniqueEntityID(raw._id.toString())
    );

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building): IBuildingPersistence {
    const a = {
      _id: building.id.toString(),
      name: building.name,
      floors: building.floors.map(floor => floor.floorId.toString()),
      // TODO: implement elevator here
    }
    return a;
  }
}
