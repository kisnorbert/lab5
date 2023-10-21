import { Request, Response, NextFunction } from 'express';
import { Service, Inject } from 'typedi';
import config from "../../config";
import { Building } from '../domain/building';
import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController {

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = Building.create(req.body);

      if (buildingOrError.isFailure) {
        return res.status(400).send(buildingOrError.error);
      }

      const building = buildingOrError.getValue();
      // TODO: Save building to the database

      return res.status(201).json(building);
    } catch (e) {
      return next(e);
    }
  }

  /*public async editBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingId = req.params.id;
      const updatedData = req.body;

      // TODO: Call the service method to update the building in the database
      const result = await this.buildingService.editBuilding(buildingId, updatedData);

      if (result.isFailure) {
        return res.status(400).send(result.error);
      }

      return res.status(200).json(result.getValue());
    } catch (e) {
      return next(e);
    }
  }*/
}
