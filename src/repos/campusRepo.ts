import { Service, Inject } from 'typedi';
import ICampusRepo from '../services/IRepos/ICampusRepo';
import { Campus } from '../domain/campus';
import { CampusMap } from '../mappers/CampusMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { ICampusPersistence } from '../dataschema/ICampusPersistence';

@Service()
export default class CampusRepo implements ICampusRepo {
  constructor(
    @Inject('campusSchema') private campusSchema: Model<ICampusPersistence & Document>
  ) {}

  public async exists(campus: Campus): Promise<boolean> {
    const idX = campus.id.toString();
    const query = { domainId: idX };
    const campusDocument = await this.campusSchema.findOne(query as FilterQuery<ICampusPersistence & Document>);
    return !!campusDocument === true;
  }

  async save(campus: Campus): Promise<Campus> {
    const raw = CampusMap.toPersistence(campus);
    const campusDoc = await this.campusSchema.create(raw);
    return CampusMap.toDomain(campusDoc);
  }

  async findByDomainId(campusId: string): Promise<Campus> {
    const campusDoc = await this.campusSchema.findById(campusId).exec();
    return campusDoc ? CampusMap.toDomain(campusDoc) : null;
  }
}
