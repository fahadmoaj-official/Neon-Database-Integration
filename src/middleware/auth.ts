import type {Request, Response, NextFunction} from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import pool from "../config/db";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized access, token missing or invalid",
        });
    }

    const token = authHeader.split(' ')[1];

   
    try {
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET_KEY as string)as JwtPayload;
      
        const userdata = await pool.query(`
            SELECT * FROM user_profiles WHERE email = $1
        `, [decoded.email]);
        
        

        if(userdata.rows.length === 0) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized access, user not found",
            });
        }

        req.user = decoded;

    }catch(error) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized access, token verification failed",
        });
    }
}