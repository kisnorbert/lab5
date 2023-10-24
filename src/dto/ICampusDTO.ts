import { Building } from '../domain/building';
import IBuildingDTO from './IBuildingDTO';

export default interface ICampusDTO {
    id?: string;
    name: string;
    buildings?: string[];
  }
  