import { Request, Response, NextFunction } from 'express';
import { Service, Inject } from 'typedi';
import config from "../../config";
import { Campus } from '../domain/campus';
import { Result } from "../core/logic/Result";
import ICampusService from '../services/IServices/ICampusService';
import ICampusDTO from '../dto/ICampusDTO';
import ICampusController from "./IControllers/ICampusController";
import { CampusMap } from "../mappers/CampusMap";



@Service()
export default class RoomController {
  constructor(
    @Inject(config.services.campus.name) private campusServiceInstance : ICampusService
) {}

  public async createCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const campusOrError = await this.campusServiceInstance.createCampus(req.body as ICampusDTO) as Result<ICampusDTO>;

      if (campusOrError.isFailure) {
        return res.status(400).send(campusOrError.error);
      }

      const campus = campusOrError.getValue();

      return res.status(201).json(campus);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllCampuses(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await this.campusServiceInstance.getAllCampuses();
        if (result.isFailure) {
            return res.status(400).send(result.error);
        }
        return res.status(200).json(result.getValue());
    } catch (e) {
        return next(e);
    }
}

  
}
