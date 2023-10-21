import { Request, Response, NextFunction } from 'express';
import { Service, Inject } from 'typedi';
import config from "../../config";
import { Building } from '../domain/building';
import { Result } from "../core/logic/Result";
import IBuildingService from '../services/IServices/IBuildingService';
import IBuildingDTO from '../dto/IBuildingDTO';
import IBuildingController from "./IControllers/IBuildingController";
import { BuildingMap } from "../mappers/BuildingMap";



@Service()
export default class BuildingController {
  constructor(
    @Inject(config.services.building.name) private buildingServiceInstance : IBuildingService
) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;

      if (buildingOrError.isFailure) {
        return res.status(400).send(buildingOrError.error);
      }

      const building = buildingOrError.getValue();

      return res.status(201).json(building);
    } catch (e) {
      return next(e);
    }
  }

  public async editBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingId = req.params.id;
      const updatedData = req.body;
  
      const buildingDTO: IBuildingDTO = {
        id: buildingId,
        ...updatedData
      };
  
      const result = await this.buildingServiceInstance.editBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;;
  
      if (result.isFailure) {
        return res.status(400).send(result.error);
      }
  
      return res.status(200).json(result.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async getAllBuildings(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await this.buildingServiceInstance.getAllBuildings();
        if (result.isFailure) {
            return res.status(400).send(result.error);
        }
        return res.status(200).json(result.getValue());
    } catch (e) {
        return next(e);
    }
}

  
}
