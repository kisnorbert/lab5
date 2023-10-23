import { AggregateRoot } from "../core/domain/AggregateRoot";
import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { RobotId } from "./robotId";
import { Robottype } from "./robottype";

interface RobotProps {
    name : string;
  }

  export class Robot extends AggregateRoot<RobotProps> {
    private constructor(props: RobotProps, id?: UniqueEntityID) {
      super(props, id);
    }
    get id(): UniqueEntityID {
      return this._id;
    }
  
    get robotId(): RobotId{
        return new RobotId(this.robotId.toValue());
    }
    
    get name(): string {
        return this.props.name;
    }
    
    set name(value: string) {
        this.props.name = value;
    }



    public static create(props: Robot, id?: UniqueEntityID): Result<Robot> {
      const isValidName = !!props.name && props.name.trim().length > 0;
      
  
      if (!isValidName) {
        return Result.fail<Robot>('Invalid robot properties');
      }
  
      return Result.ok<Robot>(new Robot(props, id));
    }
  }