import { AggregateRoot } from "../core/domain/AggregateRoot";
import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { RobotId } from "./robotId";
import { Robottype } from "./robottype";

interface RobotProps {
    name : string;
    robottype : Robottype;
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

    get robottype(): Robottype{
        return this.props.robottype;
    }
    set robottype(value:Robottype){
        this.props.robottype = value;
    }

    public static create(props: Robot, id?: UniqueEntityID): Result<Robot> {
      const isValidName = !!props.name && props.name.trim().length > 0;
      const isValidRobottype = !!props.robottype;
      
  
      if (!isValidName || !isValidRobottype) {
        return Result.fail<Robot>('Invalid robot properties');
      }
  
      return Result.ok<Robot>(new Robot(props, id));
    }
  }