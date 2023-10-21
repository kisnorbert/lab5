import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building";

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  findByDomainId(buildingId: string): Promise<Building>;
  
}
