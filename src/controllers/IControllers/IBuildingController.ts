import { Request, Response, NextFunction } from 'express';

export default interface IBuildingController {
  createBuilding(req: Request, res: Response, next: NextFunction): Promise<void>;
  editBuilding(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllBuildings(req: Request, res: Response, next: NextFunction): Promise<void>;
}
