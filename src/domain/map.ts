import { List } from "lodash";
import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Room } from "./room";
import { FloorId } from "./floorId";
import { FloorMapId } from "./mapId";



interface FloorMapProps {
    xsize : number;
    ysize : number;
  }

  export class FloorMap extends Entity<FloorMapProps> {
    private constructor(props: FloorMapProps, id?: UniqueEntityID) {
      super(props, id);
    }
    get id(): UniqueEntityID {
      return this._id;
    }
  
    get mapId(): FloorMapId{
        return new FloorMapId(this.mapId.toValue());
    }
    
    get xsize(): number {
        return this.props.xsize;
    }
    
    set xsize(value: number) {
        this.props.xsize = value;
    }

    get ysize(): number{
        return this.props.ysize;
    }
    set ysize(value:number){
        this.props.ysize = value;
    }

    public static create(props: FloorMapProps, id?: UniqueEntityID): Result<FloorMap> {
      const isValidsize = props.xsize!=0 && props.ysize!=0;
      
  
      if (!isValidsize) {
        return Result.fail<FloorMap>('Invalid map properties');
      }
  
      return Result.ok<FloorMap>(new FloorMap(props, id));
    }
  }