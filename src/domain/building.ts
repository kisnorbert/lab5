import { IntegerType } from "mongodb";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { BuildingId } from "./buildingId";

interface BuildingProps {
  name: string;
  // TODO: floors has to be Entity
  floors: string[];
}

export class Building extends AggregateRoot<BuildingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get roleId (): BuildingId {
    return new BuildingId(this.roleId.toValue());
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get floors(): string[] {
    return this.props.floors;
  }

  set floors(value: string[]) {
    this.props.floors = value;
  }

  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: BuildingProps, id?: UniqueEntityID): Result<Building> {
    const isValidName = !!props.name && props.name.trim().length > 0;
    const isValidFloors = Array.isArray(props.floors) && props.floors.length > 0;

    if (!isValidName || !isValidFloors) {
      return Result.fail<Building>('Invalid building properties');
    }

    return Result.ok<Building>(new Building(props, id));
  }
}
