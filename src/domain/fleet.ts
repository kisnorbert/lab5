import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { Robottype } from "./robottype";
import { FleetId } from "./fleetId";

interface FleetProps {
  name: string;
  robottypes: Robottype[];
}

export class Fleet extends AggregateRoot<FleetProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get fleetId (): FleetId {
    return new FleetId(this.fleetId.toValue());
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get robottypes(): Robottype[] {
    return this.props.robottypes;
  }

  set robottypes(value: Robottype[]) {
    this.props.robottypes = value;
  }

  private constructor(props: Fleet, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: Fleet, id?: UniqueEntityID): Result<Fleet> {
    const isValidName = !!props.name && props.name.trim().length > 0;


    if (!isValidName) {
      return Result.fail<Fleet>('Invalid building properties');
    }

    return Result.ok<Fleet>(new Fleet(props, id));
  }
}