import dotenv from "dotenv";
import pool, { connectDB } from "../config/db";

dotenv.config();


export const initDB = async () => {
  try {
    await connectDB();
    
    await pool.query(`
        CREATE TABLE IF NOT EXISTS user_profiles(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        role varchar(20) NOT NULL DEFAULT 'user',
        CHECK (role IN ('admin', 'user', 'agent')),

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
            `); 

    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles(
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES user_profiles(id) ON DELETE CASCADE,

      bio TEXT,
      address TEXT,
      phone VARCHAR(15),
      gender VARCHAR(10),

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )  
        `);

    console.log("Database tables created successfully!");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
};