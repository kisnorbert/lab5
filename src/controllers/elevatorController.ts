import { Request, Response, NextFunction } from 'express';
import { Service, Inject } from 'typedi';
import config from "../../config";
import { Building } from '../domain/building';
import { Result } from "../core/logic/Result";
import IBuildingService from '../services/IServices/IBuildingService';
import IBuildingDTO from '../dto/IBuildingDTO';
import IBuildingController from "./IControllers/IBuildingController";
import { BuildingMap } from "../mappers/BuildingMap";
import IElevatorService from '../services/IServices/IElevatorService';
import IElevatorDTO from '../dto/IElevatorDTO';



@Service()
export default class ElevatorController {
  constructor(
    @Inject(config.services.elevator.name) private elevatorServiceInstance : IElevatorService
) {}

  public async createElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

      if (elevatorOrError.isFailure) {
        return res.status(400).send(elevatorOrError.error);
      }

      const elevator = elevatorOrError.getValue();

      return res.status(201).json(elevator);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllelevator(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await this.elevatorServiceInstance.getAllElevators();
        if (result.isFailure) {
            return res.status(400).send(result.error);
        }
        return res.status(200).json(result.getValue());
    } catch (e) {
        return next(e);
    }
}

  
}
