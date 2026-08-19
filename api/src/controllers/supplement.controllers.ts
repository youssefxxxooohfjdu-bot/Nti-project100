import type {
  Request,
  Response
} from "express";

import {
  Supplement
} from "../models/supplement.models";


// Create a new supplement
export async function createSupplement(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const supplement =
      await Supplement.create(
        request.body
      );

    response.status(201).json({
      success: true,
      data: supplement
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not create supplement"
    });

  }
}


// Get all supplements
export async function getSupplements(
  _request: Request,
  response: Response
): Promise<void> {

  try {

    const supplements =
      await Supplement
        .find()
        .sort({
          createdAt: -1
        });

    response.json({
      success: true,
      count: supplements.length,
      data: supplements
    });

  } catch {

    response.status(500).json({
      success: false,
      message: "Could not load supplements"
    });

  }
}


// Get a single supplement by ID
export async function getSupplementById(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const supplement =
      await Supplement.findById(
        request.params.id
      );

    if (!supplement) {

      response.status(404).json({
        success: false,
        message: "Supplement not found"
      });

      return;
    }

    response.json({
      success: true,
      data: supplement
    });

  } catch {

    response.status(400).json({
      success: false,
      message: "Invalid supplement id"
    });

  }
}


// Update supplement
export async function updateSupplement(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const supplement =
      await Supplement.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!supplement) {

      response.status(404).json({
        success: false,
        message: "Supplement not found"
      });

      return;
    }

    response.json({
      success: true,
      data: supplement
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not update supplement"
    });

  }
}


// Delete supplement
export async function deleteSupplement(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const supplement =
      await Supplement.findByIdAndDelete(
        request.params.id
      );

    if (!supplement) {

      response.status(404).json({
        success: false,
        message: "Supplement not found"
      });

      return;
    }

    response.json({
      success: true,
      message: "Supplement deleted"
    });

  } catch {

    response.status(400).json({
      success: false,
      message: "Invalid supplement id"
    });

  }
}