import { Service, Inject } from 'typedi';
import IRoomRepo from '../services/IRepos/IRoomRepo';
import { Room } from '../domain/room';
import { RoomMap } from '../mappers/RoomMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

@Service()
export default class RoomRepo implements IRoomRepo {
  constructor(
    @Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>
  ) {}

  public async exists(room: Room): Promise<boolean> {
    const idX = room.id.toString();
    const query = { domainId: idX };
    const roomDocument = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);
    return !!roomDocument === true;
  }

  async save(room: Room): Promise<Room> {
    const raw = RoomMap.toPersistence(room);
    const roomDoc = await this.roomSchema.create(raw);
    return RoomMap.toDomain(roomDoc);
  }

  async findByDomainId(roomId: string): Promise<Room> {
    const roomDoc = await this.roomSchema.findById(roomId).exec();
    return roomDoc ? RoomMap.toDomain(roomDoc) : null;
  }

  async findAll(): Promise<Room[]> {
    const roomDocs = await this.roomSchema.find().exec();
    return roomDocs.map(RoomMap.toDomain);
  }
}

