import { RobottypeId } from "./robottypeId"
import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Tasktype } from "./tasktype";
import { Robot } from "./robot";




interface RobotypeProps {
    name : string;
    tasktypes : Tasktype[];
    robots: Robot[]
  }

  export class Robottype extends Entity<RobotypeProps> {
    private constructor(props: RobotypeProps, id?: UniqueEntityID) {
      super(props, id);
    }
    get id(): UniqueEntityID {
      return this._id;
    }
  
    get robottypeId(): RobottypeId{
        return new RobottypeId(this.robottypeId.toValue());
    }
    
    get name(): string {
        return this.props.name;
    }
    
    set name(value: string) {
        this.props.name = value;
    }

    get tasktypes(): Tasktype[]{
        return this.props.tasktypes;
    }
    set tasktypes(value:Tasktype[]){
        this.props.tasktypes = value;
    }
    get robots(): Robot[]{
      return this.props.robots;
    }
    set robots(value:Robot[]){
      this.props.robots = value;
    }

    public static create(props: RobotypeProps, id?: UniqueEntityID): Result<Robottype> {
      const isValidName = !!props.name && props.name.trim().length > 0;
      const isValidTasktypes = Array.isArray(props.tasktypes) && props.tasktypes.length > 0;
      
  
      if (!isValidName) {
        return Result.fail<Robottype>('Invalid robottype properties');
      }
  
      return Result.ok<Robottype>(new Robottype(props, id));
    }
  }