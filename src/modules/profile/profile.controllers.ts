import type { Request, Response } from "express";
import pool from "../../config/db";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
   try {
    const result = await profileService.createProfileIntoDB(req.body);
    res.status(201).json({ 
        sucesss: true,
        data: result,
        message: "Profile created successfully"
    });
    
   } catch (error) {
     res.status(500).json({ 
        sucesss: false,
        error: "Failed to create profile" ,
        message: error instanceof Error ? error.message : "Unknown error"
    });
   }
}


export const profileController = {
  createProfile,
};