import { IntegerType } from "mongodb";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Building } from "./building";
import { Floor } from "./floor";
import { PassageId } from "./passageId";


interface PassageProp {
  firstbuilding : Building;
  firstfloor : Floor;
  secondbuilding : Building;
  secondfloor: Floor;
  name: string;
  
}

export class Passage extends AggregateRoot<PassageProp> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get passageId (): PassageId {
    return new PassageId(this.passageId.toValue());
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get firstbuilding(): Building {
    return this.props.firstbuilding;
  }

  set firstbuilding(value: Building) {
    this.props.firstbuilding = value;
  }

  get secondbuilding(): Building {
    return this.props.secondbuilding;
  }

  set secondbuilding(value: Building) {
    this.props.secondbuilding = value;
  }

  get firstfloor(): Floor {
    return this.props.firstfloor;
  }

  set firstfloor(value: Floor) {
    this.props.firstfloor = value;
  }

  get secondfloor(): Floor {
    return this.props.secondfloor;
  }

  set secondfloor(value: Floor) {
    this.props.secondfloor = value;
  }



  private constructor(props: PassageProp, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PassageProp, id?: UniqueEntityID): Result<Passage> {
    const isValidfirstFloor = props.firstbuilding.floors.some(f=>f.floorId.equals(props.firstfloor.floorId));
    const isValidsecondFloor = props.secondbuilding.floors.some(f=>f.floorId.equals(props.secondfloor.floorId));
    

    if (!isValidfirstFloor || !isValidsecondFloor) {
      return Result.fail<Passage>('Invalid passage properties');
    }

    return Result.ok<Passage>(new Passage(props, id));
  }
}