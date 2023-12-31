import { Service, Inject } from 'typedi';

import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import { Building } from '../domain/building';
import { BuildingMap } from '../mappers/BuildingMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

@Service()
export default class BuildingRepo implements IBuildingRepo {
  constructor(
    @Inject('buildingSchema') private buildingSchema: Model<IBuildingPersistence & Document>
  ) {}
  findByDomainId(buildingId: string): Promise<Building> {
    throw new Error('Method not implemented.');
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(building: Building): Promise<boolean> {
    const idX = building.id.toString();
    const query = { domainId: idX };
    const buildingDocument = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);
    return !!buildingDocument === true;
  }

  public async save(building: Building): Promise<Building> {
    const query = { domainId: building.id.toString() }; 

    const buildingDocument = await this.buildingSchema.findOne( query );

    try {
      if (buildingDocument === null ) {
        const rawBuilding: any = BuildingMap.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.name = building.name;
        //buildingDocument.elevator = building.elevator;
        await buildingDocument.save();

        return building;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findAll(): Promise<Building[]> {
    const buildingRecords = await this.buildingSchema.find({});
    return buildingRecords.map(buildingRecord => BuildingMap.toDomain(buildingRecord));
}
}
