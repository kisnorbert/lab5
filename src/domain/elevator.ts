import { IntegerType } from "mongodb";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Building } from "./building";
import { Floor } from "./floor";
import { ElevatorId } from "./elevatorId";
import { Entity } from "../core/domain/Entity";


interface ElevatorProp {
  name: string;
  building: Building;
  elevatorfloors: Floor[];
  
}

export class Elevator extends Entity<ElevatorProp> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get elevatorId (): ElevatorId {
    return new ElevatorId(this.elevatorId.toValue());
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }


  get elevatorfloors(): Floor[] {
    return this.props.elevatorfloors;
  }

  set elevatorfloors(value: Floor[]) {
    this.props.elevatorfloors = value;
  }



  private constructor(props: ElevatorProp, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ElevatorProp, id?: UniqueEntityID): Result<Elevator> {

    const isValidelevatorfloorarray= Array.isArray(props.elevatorfloors) && props.elevatorfloors.length > 1;
    

    if (!isValidelevatorfloorarray) {
      return Result.fail<Elevator>('Invalid elevator properties');
    }

    return Result.ok<Elevator>(new Elevator(props, id));
  }
}