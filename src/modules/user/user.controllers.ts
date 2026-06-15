import type { Request, Response } from "express";
import pool from "../../config/db";
import { UserService } from "./user.service";
import sendResponse from "../../utility/sendResponse";
const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, age, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password are required",
      });
    }

    const result = await UserService.createUserIntoDb({  // db query
      name,
      email,
      password,
      age,
      role : role || 'user'
    });

    // res.status(201).json({
    //   success: true,
    //   message: "User created successfully",
    //   data: result.rows[0],
    // });

    // amra chilew respons tah ei babe industry stnad follow korte pari

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });


  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   error: "Failed to create user",
    //   message: error instanceof Error ? error.message : "Unknown error",
    // });


    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Failed to create user",
      error: error instanceof Error ? error.message : "Unknown error",
    });

  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersIntoDB(); // db query
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get All users",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getUsersbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await UserService.getUserByIdIntoDb(id as string); // db query

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get user by ID",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { name, email, password, age, is_active, role } = req.body;
    const { id } = req.params;

    const result = await UserService.getUpdateUserByIdIntoDb(id as string, {
      name,
      email,
      password,
      age,
      is_active,
      role
    }); // db query

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update user",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  
    const result = await UserService.deleteUserByIdIntoDb(id as string); // db query
   

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Delete successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update user",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getUsersbyId,
  updateUserById,
  deleteUserById,
};
