import { Mapper } from "../core/infra/Mapper";
import { Campus } from '../domain/campus';
import ICampusDTO from '../dto/ICampusDTO';
import { ICampusPersistence } from '../dataschema/ICampusPersistence';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { BuildingMap } from './BuildingMap';
import IBuildingDTO from "../dto/IBuildingDTO";

export class CampusMap extends Mapper<Campus> {
  public static toDTO(campus: Campus): ICampusDTO {
    return {
      id: campus.id.toString(),
      name: campus.name,
      buildings: campus.buildings.map(building => building.buildingId.toString()),
      passages: campus.passages.map(passage => passage.passageId.toString())
    }as ICampusDTO;
  }

  public static toDomain(raw: any): Campus {
    const campusOrError = Campus.create(
      {
        name: raw.name,
        buildings: raw.buildings || [],
        passages: raw.passages || []
      },
      new UniqueEntityID(raw._id.toString())
    );

    campusOrError.isFailure ? console.log(campusOrError.error) : '';
    return campusOrError.isSuccess ? campusOrError.getValue() : null;
  }

  public static toPersistence(campus: Campus): ICampusPersistence {
    const a = {
      _id: campus.id.toString(),
      name: campus.name,
      buildings: campus.buildings.map(building => building.buildingId.toString()),
      passages: campus.passages.map(passage => passage.passageId.toString()),
    }
    return a;
  } 

}
