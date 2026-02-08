import Service from "../models/service.model.js";
import { ApiResponse } from "../util/Api-Response.js";
import { asyncHandler } from "../util/async-handler.js";
import { slots } from "../util/slot-availability.js"

export const getSlots = asyncHandler(async(req, res) => {
    const {serviceId} = req.params
    const service = await Service.findById(serviceId)
    const startTime = service.openingTime
    const endTime = service.closingTime
    const slotDuration = service.slotDuration
    const slotlist = slots(startTime, endTime, slotDuration)

    return res
        .status(200)
        .json(new ApiResponse(200, slotlist, "all Slots are listed"))
})