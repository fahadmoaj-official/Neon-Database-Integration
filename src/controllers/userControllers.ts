import type { Request, Response } from 'express';
import pool from '../config/db';
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, age } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                error: 'Name, email, and password are required' 
            });
        }

        

        const result = await pool.query(`
            INSERT INTO user_profiles (name, email, password, age)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [name, email, password, age]);
            

        res.status(201).json({ 
            success: true,
            message: 'User created successfully',
            data: result.rows[0] 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Failed to create user' ,
            message : error instanceof Error ? error.message : 'Unknown error'  
        });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM user_profiles');
        res.status(200).json({ 
            success: true,
            data: result.rows 
        });
        
    } catch (error) {
         res.status(500).json({ 
            success: false,
            error: 'Failed to get All users' ,
            message : error instanceof Error ? error.message : 'Unknown error'  
        });
    }
}

export const getUsersbyId = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const result = await pool.query(`SELECT * FROM user_profiles
            where id = $1
            `, [id]);


            if (result.rows.length === 0) {
                return res.status(404).json({ 
                    success: false,
                    error: 'User not found' 
                });
            }


        res.status(200).json({ 
            success: true,
            data: result.rows[0] 
        });
        
    } catch (error) {
         res.status(500).json({ 
            success: false,
            error: 'Failed to get user by ID' ,
            message : error instanceof Error ? error.message : 'Unknown error'  
        });
    }
}

export const updateUserById = async (req: Request, res: Response) => {
    try {

        const { name, email, password, age, is_active } = req.body;
        const { id } = req.params;

       
        const result = await pool.query(`
            UPDATE user_profiles
            SET name = $1, email = $2, password = $3, age = $4, is_active = $5, updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *
        `, [name, email, password, age, is_active, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                success: false,
                error: 'User not found' 
            });
        }

        res.status(200).json({ 
            success: true,
            message: 'User updated successfully',
            data: result.rows[0] 
        });

        
        
    } catch (error) {
         res.status(500).json({ 
            success: false,
            error: 'Failed to update user' ,
            message : error instanceof Error ? error.message : 'Unknown error'  
        });
    }
}
export const DeleteUserById = async (req: Request, res: Response) => {
    try {

        
        const { id } = req.params;

       
        const result = await pool.query(`
            DELETE FROM user_profiles
            WHERE id = $1
            returning * 
        `, [id]);   

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                success: false,
                error: 'User not found' 
            });
        }

        res.status(200).json({ 
            success: true,
            message: 'User Delete successfully',
            data: result.rows[0]
        });

        
        
    } catch (error) {
         res.status(500).json({ 
            success: false,
            error: 'Failed to update user' ,
            message : error instanceof Error ? error.message : 'Unknown error'  
        });
    }
}

