import { Result } from "../../core/logic/Result";
import ICampusDTO from "../../dto/ICampusDTO";

export default interface ICampusService {
  createCampus(campusDTO: ICampusDTO): Promise<Result<ICampusDTO>>;
  updateCampus(campusDTO: ICampusDTO): Promise<Result<ICampusDTO>>;
  getCampus (campusId: string): Promise<Result<ICampusDTO>>;
}