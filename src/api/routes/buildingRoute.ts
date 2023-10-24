import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import BuildingController from '../../controllers/buildingController';
import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/buildings', route);

  const ctrl = Container.get(BuildingController);

  route.post('/',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        floors: Joi.array().items(Joi.string()).required(),
        elevator: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next)
  );

  route.put('/:id',
    celebrate({
      body: Joi.object({
        name: Joi.string().optional(),
        floors: Joi.array().items(Joi.string()).optional(),
        elevator: Joi.string().optional()
      })
    }),
    (req, res, next) => ctrl.editBuilding(req, res, next)
  );

  route.get('/', 
  (req, res, next) => ctrl.getAllBuildings(req, res, next));
};
