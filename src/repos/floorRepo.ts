import { Service, Inject } from 'typedi';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/FloorMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

@Service()
export default class FloorRepo implements IFloorRepo {
  constructor(
    @Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>
  ) {}

  public async exists(floor: Floor): Promise<boolean> {
    const idX = floor.id.toString();
    const query = { domainId: idX };
    const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
    return !!floorDocument === true;
  }

  async save(floor: Floor): Promise<Floor> {
    const raw = FloorMap.toPersistence(floor);
    const floorDoc = await this.floorSchema.create(raw);
    return FloorMap.toDomain(floorDoc);
  }

  async findByDomainId(floorId: string): Promise<Floor> {
    const floorDoc = await this.floorSchema.findById(floorId).exec();
    return floorDoc ? FloorMap.toDomain(floorDoc) : null;
  }

  async findAll(): Promise<Floor[]> {
    const floorDocs = await this.floorSchema.find().exec();
    return floorDocs.map(FloorMap.toDomain);
  }
}
