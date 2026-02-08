import { Router } from "express";
import { getAllServices, getServiceResources, registerService } from "../controllers/service.controller.js";
import { getSlots } from "../controllers/availablity.controller.js";

const serviceRouter = Router()

serviceRouter.get("/", getAllServices)

serviceRouter.get('/:serviceId/resources', getServiceResources);
serviceRouter.post('/register', registerService)
serviceRouter.get('/:serviceId/slots',getSlots)

export default serviceRouter;