import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db';
import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World');
});

//query 

const queryTest = async () => {
    try {

        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_profiles (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                is_active BOOLEAN DEFAULT true,
                age INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            `)

            console.log("sucessfully exicute ")
        
    } catch (error) {
            console.error('Error executing query:', error);
    }
}

queryTest();

// routes
app.use('/api', userRoutes)



const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();