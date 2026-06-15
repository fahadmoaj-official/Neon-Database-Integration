import bcrypt from "bcryptjs";
import pool from "../../config/db";
import type { IUser } from "./user.interface";

const createUserIntoDb = async (payload:IUser)=>{
        const { name, email, password, age,role } = payload;

        const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(`
            INSERT INTO user_profiles (name, email, password, age, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [name, email, hashedPassword, age, role]);

        delete result.rows[0].password; // for security reasons, we don't want to return the password in the response

        return result;
}   

const getAllUsersIntoDB = async ()=>{
     const result = await pool.query("SELECT * FROM user_profiles");
        return result;
}
const getUserByIdIntoDb = async (id: string )=>{
   const result = await pool.query(
      `SELECT * FROM user_profiles
            where id = $1
            `,
      [id],
    );
        return result;
}



const getUpdateUserByIdIntoDb = async (id: string, payload: Partial<IUser>)=>{
    const { name, email, password, age, is_active, role } = payload;

    let hashedPassword: string | undefined;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
   
    const result = await pool.query(
      `
            UPDATE user_profiles
            SET name = $1, email = $2, password = $3, age = $4, is_active = $5, role = $6, updated_at = CURRENT_TIMESTAMP
            WHERE id = $7
            RETURNING *
        `,
      [name, email, hashedPassword, age, is_active, role, id],
    );
    delete result.rows[0].password;
    return result;
}

const deleteUserByIdIntoDb = async (id: string)=>{
     const result = await pool.query(
      `
            DELETE FROM user_profiles
            WHERE id = $1
            returning * 
        `,
      [id],
    );
    return result;
}


export const UserService = {
    createUserIntoDb,
    getAllUsersIntoDB,
    getUserByIdIntoDb,
    getUpdateUserByIdIntoDb,
    deleteUserByIdIntoDb
}