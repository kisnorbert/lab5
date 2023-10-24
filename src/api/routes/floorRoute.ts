import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import CampusController from '../../controllers/campusController';
import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/floors', route);

  const ctrl = Container.get(CampusController);

  route.post('/',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        floors: Joi.array().items(Joi.string()).required()
      })
    }),
    (req, res, next) => ctrl.createCampus(req, res, next)
  );

  route.get('/', 
  (req, res, next) => ctrl.getAllCampuses(req, res, next));
};
