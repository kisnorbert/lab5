import { Repo } from "../../core/infra/Repo";
import { Elevator } from "../../domain/elevator";

export default interface IElevatorRepo extends Repo<Elevator> {
  save(elevator: Elevator): Promise<Elevator>;
  findByDomainId(elevatorId: string): Promise<Elevator>;
  findAll(): Promise<Elevator[]>;
}
