import { IntegerType } from "mongodb";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { BuildingId } from "./buildingId";
import { Floor } from "./floor";
import { List } from "lodash";

interface BuildingProps {
  name: string;
  // TODO: floors has to be Entity
  floors: Floor[];
}

export class Building extends AggregateRoot<BuildingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get buildingId (): BuildingId {
    return new BuildingId(this.buildingId.toValue());
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get floors(): Floor[] {
    return this.props.floors;
  }

  set floors(value: Floor[]) {
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
