import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { SemesterRegistrationServices } from "./semesterRegistration.services";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester registration is created successfully",
      data: result,
    });
  }
);

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
        req.query
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester registration is retrieved successfully",
      data: result,
    });
  }
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(
        id
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester registration is retrieved successfully",
      data: result,
    });
  }
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const result =
      await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
        id,
        body
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester registration is updated successfully",
      data: result,
    });
  }
);

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
