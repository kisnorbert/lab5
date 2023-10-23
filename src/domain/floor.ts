import { List } from "lodash";
import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Room } from "./room";
import { FloorId } from "./floorId";
import { FloorMap } from "./map";



interface FloorProp {
    name : string;
    rooms : Room[];
    floormap : FloorMap;
  }

  export class Floor extends Entity<FloorProp> {
    private constructor(props: FloorProp, id?: UniqueEntityID) {
      super(props, id);
    }
    get id(): UniqueEntityID {
      return this._id;
    }
  
    get floorId(): FloorId{
        return new FloorId(this.floorId.toValue());
    }
    
    get name(): string {
        return this.props.name;
    }
    
    set name(value: string) {
        this.props.name = value;
    }

    get rooms(): Room[]{
        return this.props.rooms;
    }
    set rooms(value:Room[]){
        this.props.rooms = value;
    }
    get floormap(): FloorMap {
      return this.props.floormap;
    }
  
    set floormap(value: FloorMap) {
      this.props.floormap = value;
    }

    public static create(props: FloorProp, id?: UniqueEntityID): Result<Floor> {
      const isValidName = !!props.name && props.name.trim().length > 0;
      const isValidRoom = Array.isArray(props.rooms) &&props.rooms.length>0;
      
  
      if (!isValidName || !isValidRoom) {
        return Result.fail<Floor>('Invalid floor properties');
      }
  
      return Result.ok<Floor>(new Floor(props, id));
    }
  }

