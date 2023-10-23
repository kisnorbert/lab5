import { Result } from "../../core/logic/Result";
import IRoomDTO from "../../dto/IRoomDTO";

export interface IRoomService {
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  editRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  findRoomById(id: string): Promise<Result<IRoomDTO>>;
  findAllRooms(): Promise<Result<IRoomDTO[]>>;
  deleteRoom(id: string): Promise<Result<void>>;
}
