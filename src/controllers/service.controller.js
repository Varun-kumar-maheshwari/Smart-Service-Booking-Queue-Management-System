import Service from "../models/service.model.js";
import Resource from "../models/resource.model.js";
import { asyncHandler } from "../util/async-handler.js";
import { ApiError } from "../util/Api-Error.js";
import { ApiResponse } from "../util/Api-Response.js";

export const getAllServices = asyncHandler( async(req, res) => {
    const services = await Service.find();
    return res
    .status(200)
    .json(new ApiResponse(200, services, "all services are sent"))
})

export const getServiceResources = asyncHandler( async (req, res) => {
    const resources = await Resource.find({service : req.params.serviceId})
    return res
    .status(200)
    .json(new ApiResponse(200, resources, "Resources are sent"))
})

export const registerService = asyncHandler(async(req, res) => {
    const {name, openingTime , closingTime, description, type, slotDuration} = req.body || {}
    const service =await Service.create({
        name : name,
        openingTime : openingTime ? openingTime : "9:00",
        closingTime : closingTime ? closingTime : "19:00",
        description : description ? description : "",
        type : type ? type : "CAFE",
        slotDuration : slotDuration ? slotDuration : 60
    })

    await service.save()
    return res.status(200)
    .json(new ApiResponse(200, [service], "nothing to show rn "))
})