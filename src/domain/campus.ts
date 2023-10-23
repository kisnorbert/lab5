import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Passage } from "./passage";
import { Building } from "./building";
import { CampusId } from "./campusId";
import { AggregateRoot } from "../core/domain/AggregateRoot";

interface CampusProps {
  name: string;
  buildings: Building[];
  passages : Passage[];
}

export class Campus extends AggregateRoot<CampusProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get campusId (): CampusId {
    return new CampusId(this.campusId.toValue());
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get buildings(): Building[] {
    return this.props.buildings;
  }

  set buildings(value: Building[]) {
    this.props.buildings = value;
  }
  get passages(): Passage[] {
    return this.props.passages;
  }

  set passages(value: Passage[]) {
    this.props.passages = value;
  }

  private constructor(props: CampusProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CampusProps, id?: UniqueEntityID): Result<Campus> {
    const isValidName = !!props.name && props.name.trim().length > 0;


    if (!isValidName) {
      return Result.fail<Campus>('Invalid building properties');
    }

    return Result.ok<Campus>(new Campus(props, id));
  }
}