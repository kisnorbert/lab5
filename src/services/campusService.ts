import { Service, Inject } from 'typedi';
import { Campus } from '../domain/campus';
import { Building } from '../domain/building';
import ICampusRepo from './IRepos/ICampusRepo';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Result } from "../core/logic/Result";
import ICampusDTO from '../dto/ICampusDTO';
import config from '../../config';
import { CampusMap } from '../mappers/CampusMap';
import 'reflect-metadata';

@Service()
export class CampusService {
  constructor(
    @Inject(config.repos.campus.name) private campusRepo: ICampusRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo
  ) {}

  public async createCampus(campusDTO: ICampusDTO): Promise<Result<ICampusDTO>> {
    try {
      // Fetch the associated Building objects using the building IDs
      const buildingEntities: Building[] = [];
      for (const buildingId of campusDTO.buildings) {
        const buildingOrError = await this.getBuilding(buildingId);
        if (buildingOrError.isFailure) {
          return Result.fail<ICampusDTO>(buildingOrError.error);
        }
        buildingEntities.push(buildingOrError.getValue());
      }

      // Construct the Campus domain entity using these Building objects
      const campusOrError = Campus.create({
        ...campusDTO,
        buildings: buildingEntities,
        // TODO handle passages
        passages: []
      });

      if (campusOrError.isFailure) {
        return Result.fail<ICampusDTO>(campusOrError.error);
      }

      const campus = campusOrError.getValue();
      await this.campusRepo.save(campus);
      const campusDTOResult = CampusMap.toDTO( campus ) as ICampusDTO;
      return Result.ok<ICampusDTO>(campusDTOResult);

    } catch (e) {
      // Handle the error appropriately
      return Result.fail<ICampusDTO>(e.toString());
    }
  }

  // Dont change this method. It works like this. It supposed to be getBuilding
  private async getBuilding(buildingId: string): Promise<Result<Building>> {
    const building = await this.buildingRepo.findByDomainId(buildingId);
    const found = !!building;

    if (found) {
      return Result.ok<Building>(building);
    } else {
      return Result.fail<Building>("Couldn't find building by id=" + buildingId);
    }
  }
}
