import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { RoomId } from "./roomid";

interface RoomProp {
    name : string;
  }

  export class Room extends Entity<RoomProp> {
    private constructor(props: RoomProp, id?: UniqueEntityID) {
      super(props, id);
    }
    get id(): UniqueEntityID {
      return this._id;
    }
  
    get roomId (): RoomId {
      return new RoomId(this.roomId.toValue());
    }
  
    get name (): string {
      return this.props.name;
    }
  
    set name ( value: string) {
      this.props.name = value;
    }

  
    

    public static create(props: RoomProp, id?: UniqueEntityID): Result<Room> {
      const isValidName = !!props.name && props.name.trim().length > 0;
      
  
      if (!isValidName) {
        return Result.fail<Room>('Invalid room properties');
      }
  
      return Result.ok<Room>(new Room(props, id));
    }
  }

  