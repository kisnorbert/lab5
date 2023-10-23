import { Result } from "../../core/logic/Result";
import IElevatorDTO from "../../dto/IElevatorDTO";

export default interface IBuildingService {
  createElevator(buildingDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  editElevator(buildingDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  getElevator(buildingId: string): Promise<Result<IElevatorDTO>>;
  getAllElevator(): Promise<Result<IElevatorDTO[]>>;
}