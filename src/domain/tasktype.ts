import { TasktypeId } from "./tasktypeId";
import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";




interface TasktypeProps {
    name : string;
    description: string;
  }

  export class Tasktype extends Entity<TasktypeProps> {
    private constructor(props: TasktypeProps, id?: UniqueEntityID) {
      super(props, id);
    }
    get id(): UniqueEntityID {
      return this._id;
    }
  
    get tasktypeId(): TasktypeId{
        return new TasktypeId(this.tasktypeId.toValue());
    }
    
    get name(): string {
        return this.props.name;
    }
    
    set name(value: string) {
        this.props.name = value;
    }

    get description(): string{
        return this.props.description;
    }
    set description(value:string){
        this.props.description = value;
    }

    public static create(props: TasktypeProps, id?: UniqueEntityID): Result<Tasktype> {
      const isValidName = !!props.name && props.name.trim().length > 0;;
      
  
      if (!isValidName) {
        return Result.fail<Tasktype>('Invalid tasktype properties');
      }
  
      return Result.ok<Tasktype>(new Tasktype(props, id));
    }
  }