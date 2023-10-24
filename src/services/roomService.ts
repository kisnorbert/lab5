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
import { IRoomService } from './IServices/IRoomService';
import IRoomDTO from '../dto/IRoomDTO';
import { RoomMap } from '../mappers/RoomMap';

@Service()
export default class RoomService implements IRoomService {
  constructor(
    @Inject(config.repos.room.name) private roomRepo : IRoomRepo
) {}

public async getRoom(roomId: string): Promise<Result<IRoomDTO>> {
    try {
      const room = await this.roomRepo.findByDomainId(roomId);
      if (room === null) {
        return Result.fail<IRoomDTO>("Room not found");
      } else {
        const roomDTOResult = RoomMap.toDTO(room) as IRoomDTO;
        return Result.ok<IRoomDTO>(roomDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {
      const roomOrError = Room.create({
        ...roomDTO
      });

      if (roomOrError.isFailure) {
        return Result.fail<IFloorDTO>(roomOrError.error);
      }

      const room = roomOrError.getValue();
      await this.roomRepo.save(room);
      const roomDTOResult = RoomMap.toDTO( room ) as IRoomDTO;

      return Result.ok<IRoomDTO>(roomDTOResult);

    } catch (e) {
      
      return Result.fail<IRoomDTO>(e.toString());
    }
}

  


}