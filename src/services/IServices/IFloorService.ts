import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface ICampusService {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  getFloor (floorId: string): Promise<Result<IFloorDTO>>;
}