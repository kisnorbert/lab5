import { Service, Inject } from 'typedi';

import { Result } from "../core/logic/Result";
import config from '../../config';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Floor } from '../domain/floor';
import { Room } from '../domain/room';
import IElevatorService from './IServices/IElevatorService';
import IElevatorDTO from '../dto/IElevatorDTO';
import IElevatorRepo from './IRepos/IElevatorRepo';
import elevatorSchema from '../persistence/schemas/elevatorSchema';
import { ElevatorMap } from '../mappers/ElevatorMap';
import { FloorMap } from '../domain/map';
import { Elevator } from '../domain/elevator';
import IFloorRepo from './IRepos/IFloorRepo';

@Service()
export default class ElevatorService implements IElevatorService {
  constructor(
    @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
    @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
) {}


  public async getElevator(elevatorId: string): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainId(elevatorId);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>("Elevator not found");
      }
      else {
        const elevatorDTOResult = ElevatorMap.toDTO( elevator ) as IElevatorDTO;
        return Result.ok<IElevatorDTO>( elevatorDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const floorEntities: Floor[] = [];
      for (const floorId of elevatorDTO.elevatorFloors) {
        const floorOrError = await this.getFloor(floorId);
        if (floorOrError.isFailure) {
          return Result.fail<IElevatorDTO>(floorOrError.error);
        }
        floorEntities.push(floorOrError.getValue());
      }

      
      const elevatorOrError = Elevator.create({
        ...elevatorDTO,
        elevatorFloors: floorEntities,
        name: 'Üres név elevatorService - createElevator'
      });

      if (elevatorOrError.isFailure) {
        return Result.fail<IElevatorDTO>(elevatorOrError.error);
      }

      const elevator = elevatorOrError.getValue();
      await this.elevatorRepo.save(elevator);
      const elevatorDTOResult = ElevatorMap.toDTO( elevator ) as IElevatorDTO;

      return Result.ok<IElevatorDTO>(elevatorDTOResult);

    } catch (e) {
      // Handle the error appropriately
      return Result.fail<IElevatorDTO>(e.toString());
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

  public async getAllElevators(): Promise<Result<IElevatorDTO[]>> {
    try {
        const elevators = await this.elevatorRepo.findAll();
        const elevatorDTOs = elevators.map(elevator => ElevatorMap.toDTO(elevator) as IElevatorDTO);
        return Result.ok<IElevatorDTO[]>(elevatorDTOs);
    } catch (e) {
        return Result.fail<IElevatorDTO[]>(e);
    }
  }

}