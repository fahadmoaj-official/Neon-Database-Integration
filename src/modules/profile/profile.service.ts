import pool from "../../config/db";
import type { IProfile } from "./profile.interface";

const createProfileIntoDB = async (payload: IProfile) => {
    const { user_id, bio, address, phone, gender } = payload;

    // check user_id exists in user_profiles table
    const userCheck = await pool.query(`
      SELECT id FROM user_profiles 
      WHERE id = $1
    `, [user_id]);
    
    if (userCheck.rowCount === 0) {
        throw new Error("User not found fm");
    }

   const result = await pool.query(`
      INSERT INTO profiles (user_id, bio, address, phone, gender)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
   `, [user_id, bio, address, phone, gender]);

   return result.rows[0];
}


export const profileService = {
  createProfileIntoDB,
};