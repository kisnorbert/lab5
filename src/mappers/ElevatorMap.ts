import { Mapper } from "../core/infra/Mapper";
import { Elevator } from '../domain/elevator';
import IElevatorDTO from '../dto/IElevatorDTO';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { FloorMap } from './FloorMap';  // Assuming you have a FloorMap

export class ElevatorMap extends Mapper<Elevator> {
  
  public static toDTO(elevator: Elevator): IElevatorDTO {
    return {
      id: elevator.id.toString(),
      elevatorFloors: elevator.elevatorFloors.map(floor => floor.floorId.toString())
    };
  }

  public static toDomain(raw: any): Elevator {
    const elevatorOrError = Elevator.create(
      {
        name: raw.name,
        elevatorFloors: raw.elevatorFloors || [],
      },
      new UniqueEntityID(raw._id.toString())
    );

    elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';
    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
}


  public static toPersistence(elevator: Elevator): IElevatorPersistence {
    const a = {
      _id: elevator.id.toString(),
      name: elevator.name,
      elevatorFloors: elevator.elevatorFloors.map(floor => floor.floorId.toString())
    }
    return a;
  }
}
