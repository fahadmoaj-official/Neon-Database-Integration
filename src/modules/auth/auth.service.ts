import pool from "../../config/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const loginUserIntoDb = async (payload:{email:string, password:string}) => {
 
    const {email, password} = payload;

    // 1. check if the user exits.
    // 2. compare the password.
    // 3. genarate Token.

    const userData = await pool.query (`
        SELECT * FROM user_profiles WHERE email = $1
    `, [email]);

    if(userData.rowCount === 0) {
        throw new Error('User not found');
    }

    const comparePassword = await bcrypt.compare(password, userData.rows[0].password);
    
    if(!comparePassword) {
        throw new Error('Invalid password');
    }
    
    // access token genarate



    const Accesstoken = jwt.sign({
        id: userData.rows[0].id,
        email: userData.rows[0].email, 
        role: userData.rows[0].role 
    },
        process.env.JWT_SECRET_KEY as string, 
        {expiresIn: '1h'});
    
   

      const Refreshtoken = jwt.sign({
        id: userData.rows[0].id,
        email: userData.rows[0].email, 
        role: userData.rows[0].role 
    },
        process.env.REFRESH_TOKEN_SECRET as string, 
        {expiresIn: '1h'});

         return { Accesstoken, Refreshtoken };
}


const generateRefreshToken = async (refreshToken: string) =>{
    if(!refreshToken) {
        throw new Error('Refresh token not found & Unauthorized');
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as jwt.JwtPayload;

        const userData = await pool.query (`
        SELECT * FROM user_profiles WHERE id = $1
    `, [decoded.id]);
    
    if(userData.rowCount === 0) {
        throw new Error('User not found');
    }
    // access token genarate

    const Accesstoken = jwt.sign({
        id: userData.rows[0].id,
        email: userData.rows[0].email, 
        role: userData.rows[0].role 
    },
        process.env.JWT_SECRET_KEY as string, 
        {expiresIn: '1h'});

         return { Accesstoken };
    
    }catch (error) {
        throw new Error('Invalid refresh token');

    }

}

export const authService = {
  loginUserIntoDb,
  generateRefreshToken
};