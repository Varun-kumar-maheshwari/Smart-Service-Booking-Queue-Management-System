import { Router } from "express";
import { getAllServices, getServiceResources } from "../controllers/service.controller.js";

const serviceRouter = Router()

serviceRouter.get("/", getAllServices)

serviceRouter.get('/:serviceId/resources', getServiceResources);

export default serviceRouter;