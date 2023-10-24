import { Service, Inject } from 'typedi';

import IBuildingDTO from '../dto/IBuildingDTO';

import { Building } from "../domain/building";

import { Result } from "../core/logic/Result";
import { BuildingMap } from "../mappers/BuildingMap";
import { FloorMap } from "../mappers/FloorMap";
import config from '../../config';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Floor } from '../domain/floor';
import { Room } from '../domain/room';
import IFloorRepo from './IRepos/IFloorRepo';
import IElevatorRepo from './IRepos/IElevatorRepo';
import { Elevator } from '../domain/elevator';
import IFloorService from './IServices/IFloorService';
import IRoomRepo from './IRepos/IRoomRepo';
import IFloorDTO from '../dto/IRoomDTO';

@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
    @Inject(config.repos.room.name) private roomRepo : IRoomRepo
) {}

  public async getFloor(floorId: string): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByDomainId(floorId);
      if (floor === null) {
        return Result.fail<IFloorDTO>("Floor not found");
      } else {
        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  private async getRoom(roomId: string): Promise<Result<Room>> {
    const room = await this.roomRepo.findByDomainId(roomId);
    const found = !!room;

    if (found) {
      return Result.ok<Room>(room);
    } else {
      return Result.fail<Room>("Couldn't find room by id=" + roomId);
    }
  }

  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const roomEntities: Room[] = [];
      if (floorDTO.rooms) { // Check if floors are provided
        for (const roomId of floorDTO.rooms) {
          const roomOrError = await this.getRoom(roomId);
          if (roomOrError.isFailure) {
            return Result.fail<IFloorDTO>(roomOrError.error);
          }
          roomEntities.push(roomOrError.getValue());
        }
      }

      // TODO implement floorMap
      let floorMap: FloorMap | null = null;

      /* TODO implement floorMap
      if (buildingDTO.elevator) { // Check if elevatorId is provided
        const elevatorOrError = await this.getElevator(buildingDTO.elevator);
        if (elevatorOrError.isFailure) {
          return Result.fail<IBuildingDTO>(elevatorOrError.error);
        }
        buildingElevator = elevatorOrError.getValue();
      }
      */

      const floorOrError = Floor.create({
        ...floorDTO,
        rooms: roomEntities
      });

      if (floorOrError.isFailure) {
        return Result.fail<IFloorDTO>(floorOrError.error);
      }

      const floor = floorOrError.getValue();
      await this.floorRepo.save(floor);
      const floorDTOResult = FloorMap.toDTO( floor ) as IFloorDTO;

      return Result.ok<IFloorDTO>(floorDTOResult);

    } catch (e) {
      
      return Result.fail<IFloorDTO>(e.toString());
    }
}

  
public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
  try {
    const floor = await this.floorRepo.findByDomainId(floorDTO.id);
    if (!floor) {
      return Result.fail<IFloorDTO>("Floor not found");
    }

    floor.name = floorDTO.name;

    // Update rooms if provided
    if (floorDTO.rooms) {
      const roomEntities: Room[] = [];
      for (const roomId of floorDTO.rooms) {
        const roomOrError = await this.getRoom(roomId);
        if (roomOrError.isFailure) {
          return Result.fail<IFloorDTO>(roomOrError.error);
        }
        roomEntities.push(roomOrError.getValue());
      }
      floor.rooms = roomEntities;
    }

    await this.floorRepo.save(floor);
    const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
    return Result.ok<IFloorDTO>(floorDTOResult);

  } catch (e) {
    return Result.fail<IFloorDTO>(e.toString());
  }
}


  public async getAllFloors(): Promise<Result<IFloorDTO[]>> {
    try {
        const floors = await this.floorRepo.findAll();
        const floorDTOs = floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);
        return Result.ok<IFloorDTO[]>(floorDTOs);
    } catch (e) {
        return Result.fail<IFloorDTO[]>(e);
    }
  }

}