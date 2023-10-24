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
export default class FloorController {

    
  
}
