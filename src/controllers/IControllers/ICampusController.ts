import { Request, Response, NextFunction } from 'express';

export default interface ICampusController {
  createCampus(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllCampuses(req: Request, res: Response, next: NextFunction): Promise<void>;
}
