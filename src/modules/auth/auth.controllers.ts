import type { Request, Response } from "express";
import { authService } from "./auth.service";
const loginUser = async (req: Request, res: Response) => {
    
     try{

       const result = await authService.loginUserIntoDb(req.body);

       const { Accesstoken, Refreshtoken } = result;

       res.cookie('refreshToken', Refreshtoken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
       });


        res.status(201).json({ 
        sucesss: true,
        data: result,
        message: "User logged in successfully"
    });

     }catch(error){
      res.status(500).json({ 
        sucesss: false,
        error: "Failed to while login user" ,
        message: error instanceof Error ? error.message : "Unknown error"
    });
     }
}


const refreshToken = async (req: Request, res: Response) => {
      

   try{

       const result = await authService.generateRefreshToken(req.cookies.refreshToken);


        res.status(201).json({ 
        sucesss: true,
        data: result,
        message: "Refresh token generated successfully"
    });

     }catch(error){
      res.status(500).json({ 
        sucesss: false,
        error: "Failed to while generate refresh token" ,
        message: error instanceof Error ? error.message : "Unknown error while generating refresh token"
    });
     }
       
}

export const authController = {
  loginUser,
  refreshToken
};