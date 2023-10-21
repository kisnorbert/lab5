import { Service, Inject } from 'typedi';

import IBuildingDTO from '../dto/IBuildingDTO';

import { Building } from "../domain/building";

import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';
import { Result } from "../core/logic/Result";
import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
    @Inject('buildingRepo') private buildingRepo: IBuildingRepo
  ) {}

  public async getBuilding(buildingId: string): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(buildingId);
      if (building === null) {
        return Result.fail<IBuildingDTO>("Building not found");
      } else {
        const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
        return Result.ok<IBuildingDTO>(buildingDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const buildingOrError = await Building.create(buildingDTO);
      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }
      const buildingResult = buildingOrError.getValue();
      await this.buildingRepo.save(buildingResult);
      const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(buildingDTO.id);
      if (building === null) {
        return Result.fail<IBuildingDTO>("Building not found");
      } else {
        building.name = buildingDTO.name;
        building.floors = buildingDTO.floors;
        await this.buildingRepo.save(building);
        const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
        return Result.ok<IBuildingDTO>(buildingDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}