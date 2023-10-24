import { Result } from "../../core/logic/Result";
import IRoomDTO from "../../dto/IRoomDTO";

export interface IRoomService {
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  getRoom(roomId: string): Promise<Result<IRoomDTO>>;
}
