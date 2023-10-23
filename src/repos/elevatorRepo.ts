import { Service, Inject } from 'typedi';
import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import { Elevator } from '../domain/elevator';
import { ElevatorMap } from '../mappers/ElevatorMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';

@Service()
export default class ElevatorRepo implements IElevatorRepo {
  constructor(
    @Inject('elevatorSchema') private elevatorSchema: Model<IElevatorPersistence & Document>
  ) {}


  public async exists(elevator: Elevator): Promise<boolean> {
    const idX = elevator.id.toString();
    const query = { domainId: idX };
    const elevatorDocument = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);
    return !!elevatorDocument === true;
  }

  async save(elevator: Elevator): Promise<Elevator> {
    const raw = ElevatorMap.toPersistence(elevator);
    const elevatorDoc = await this.elevatorSchema.create(raw);
    return ElevatorMap.toDomain(elevatorDoc);
  }

  async findByDomainId(elevatorId: string): Promise<Elevator> {
    const elevatorDoc = await this.elevatorSchema.findById(elevatorId).exec();
    return elevatorDoc ? ElevatorMap.toDomain(elevatorDoc) : null;
  }

  async findAll(): Promise<Elevator[]> {
    const elevatorDocs = await this.elevatorSchema.find().exec();
    return elevatorDocs.map(ElevatorMap.toDomain);
  }
}
