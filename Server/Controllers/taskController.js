import mongoose from "mongoose";
import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../Middleware/error.js";
import { Attendee } from "../models/attendeeSchema.js";
import { Task } from "../models/taskSchema.js";


export const createTask = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, deadline } = req.body;
    if (!name || !deadline)
        return next(new ErrorHandler("All fields required!", 400));
    const task = await Task.create({
        name, deadline, eventId: id
    });
    res.status(200).json({
        success: true,
        task
    })
})

export const getAllTask = catchAsyncError(async (req, res, next) => {

    const tasks = await Task.find({ eventId: req.params.id });
    res.status(200).json({
        success: true,
        tasks
    })
});


export const deleteTask = catchAsyncError(async (req, res, next) => {
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId))
        return next(new ErrorHandler("Id format is invalid", 400));
    const attendee = await Attendee.find({ taskId });
    for (let i = 0; i < attendee.length; i++)
        await Attendee.findOneAndDelete({ taskId });

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
        success: true,
        message: "Task has been deleted",
    })
})

export const taskStatus = catchAsyncError(async (req, res, next) => {
    const { taskId } = req.params;
    const { status } = req.body;
    await Task.findByIdAndUpdate(taskId, { status }, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    });
    res.status(200).json({
        success: true,
        message: "Status Changed"
    })
})