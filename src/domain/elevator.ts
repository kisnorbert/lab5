import { IntegerType } from "mongodb";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Floor } from "./floor";
import { ElevatorId } from "./elevatorId";
import { Entity } from "../core/domain/Entity";


interface ElevatorProp {
  name: string;
  elevatorFloors: Floor[];
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


  get elevatorFloors(): Floor[] {
    return this.props.elevatorFloors;
  }

  set elevatorFloors(value: Floor[]) {
    this.props.elevatorFloors = value;
  }



  private constructor(props: ElevatorProp, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ElevatorProp, id?: UniqueEntityID): Result<Elevator> {

    const isValidelevatorfloorarray= Array.isArray(props.elevatorFloors) && props.elevatorFloors.length > 1;
    

    if (!isValidelevatorfloorarray) {
      return Result.fail<Elevator>('Invalid elevator properties');
    }

    return Result.ok<Elevator>(new Elevator(props, id));
  }
}