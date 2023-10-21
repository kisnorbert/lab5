import { Mapper } from "../core/infra/Mapper";
import { Building } from '../domain/building';
import IBuildingDTO from '../dto/IBuildingDTO';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class BuildingMap extends Mapper<Building> {
  public static toDTO(building: Building): IBuildingDTO {
    return {
      id: building.id.toString(),
      name: building.name,
      floors: building.floors
    };
  }

  public static toDomain(raw: any): Building {
    const buildingOrError = Building.create(
      {
        name: raw.name,
        floors: raw.floors
      },
      new UniqueEntityID(raw._id.toString())
    );

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';
    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building): IBuildingPersistence {
    return {
      _id: building.id.toString(),
      name: building.name,
      floors: building.floors
    };
  }
}
