import { Repo } from "../../core/infra/Repo";
import { Campus } from "../../domain/campus";

export default interface ICampusRepo extends Repo<Campus> {
  save(campus: Campus): Promise<Campus>;
  findByDomainId(campusId: string): Promise<Campus>;
}
