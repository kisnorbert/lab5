import { Service, Inject } from 'typedi';

import IBuildingDTO from '../dto/IBuildingDTO';

import { Building } from "../domain/building";

import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';
import { Result } from "../core/logic/Result";
import { BuildingMap } from "../mappers/BuildingMap";
import config from '../../config';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Floor } from '../domain/floor';
import { Room } from '../domain/room';
import IFloorRepo from './IRepos/IFloorRepo';
import IElevatorRepo from './IRepos/IElevatorRepo';
import { Elevator } from '../domain/elevator';

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
    @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
    @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo
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
      const floorEntities: Floor[] = [];
      if (buildingDTO.floors) { // Check if floors are provided
        for (const floorId of buildingDTO.floors) {
          const floorOrError = await this.getFloor(floorId);
          if (floorOrError.isFailure) {
            return Result.fail<IBuildingDTO>(floorOrError.error);
          }
          floorEntities.push(floorOrError.getValue());
        }
      }


      let buildingElevator: Elevator | null = null;

      if (buildingDTO.elevator) { // Check if elevatorId is provided
        const elevatorOrError = await this.getElevator(buildingDTO.elevator);
        if (elevatorOrError.isFailure) {
          return Result.fail<IBuildingDTO>(elevatorOrError.error);
        }
        buildingElevator = elevatorOrError.getValue();
      }

      const buildingOrError = Building.create({
        ...buildingDTO,
        floors: floorEntities, // This will be an empty array if no floors are provided
        elevator: buildingElevator // This will be null if no elevatorId is provided
      });

      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.error);
      }

      const building = buildingOrError.getValue();
      await this.buildingRepo.save(building);
      const buildingDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;

      return Result.ok<IBuildingDTO>(buildingDTOResult);

    } catch (e) {
      
      return Result.fail<IBuildingDTO>(e.toString());
    }
}

  
public async editBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
  try {
    const building = await this.buildingRepo.findByDomainId(buildingDTO.id);
    if (!building) {
      return Result.fail<IBuildingDTO>("Building not found");
    }

    building.name = buildingDTO.name;

    // Update floors if provided
    if (buildingDTO.floors) {
      const floorEntities: Floor[] = [];
      for (const floorId of buildingDTO.floors) {
        const floorOrError = await this.getFloor(floorId);
        if (floorOrError.isFailure) {
          return Result.fail<IBuildingDTO>(floorOrError.error);
        }
        floorEntities.push(floorOrError.getValue());
      }
      building.floors = floorEntities;
    }

    // Update elevator if provided
    if (buildingDTO.elevator) {
      const elevatorOrError = await this.getElevator(buildingDTO.elevator);
      if (elevatorOrError.isFailure) {
        return Result.fail<IBuildingDTO>(elevatorOrError.error);
      }
      building.elevator = elevatorOrError.getValue();
    }

    await this.buildingRepo.save(building);
    const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
    return Result.ok<IBuildingDTO>(buildingDTOResult);

  } catch (e) {
    return Result.fail<IBuildingDTO>(e.toString());
  }
}


  public async getAllBuildings(): Promise<Result<IBuildingDTO[]>> {
    try {
        const buildings = await this.buildingRepo.findAll();
        const buildingDTOs = buildings.map(building => BuildingMap.toDTO(building) as IBuildingDTO);
        return Result.ok<IBuildingDTO[]>(buildingDTOs);
    } catch (e) {
        return Result.fail<IBuildingDTO[]>(e);
    }
  }

  // don't overwrite this. Its needed. Its supposed to be getFloor
  private async getFloor(floorId: string): Promise<Result<Floor>> {
    const floor = await this.floorRepo.findByDomainId(floorId);
    const found = !!floor;

    if (found) {
      return Result.ok<Floor>(floor);
    } else {
      return Result.fail<Floor>("Couldn't find floor by id=" + floorId);
    }
  }

  // don't overwrite this. Its needed. Its supposed to be getFloor
  private async getElevator(elevatorId: string): Promise<Result<Elevator>> {
    const elevator = await this.elevatorRepo.findByDomainId(elevatorId);
    const found = !!elevator;

    if (found) {
      return Result.ok<Elevator>(elevator);
    } else {
      return Result.fail<Elevator>("Couldn't find elevator by id=" + elevatorId);
    }
  }

}