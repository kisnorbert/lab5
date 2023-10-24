import IElevatorDTO from './IElevatorDTO';
import IFloorDTO from './IFloorDTO';

export default interface IBuildingDTO {
    id?: string;
    name: string;
    floors?: string[];
    elevator?: string;
  }
  