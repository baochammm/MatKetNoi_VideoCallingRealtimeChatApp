// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//     console.log("Error in connecting to MongoDB", error);
//     process.exit(1);
//     }
// };

import mysql from 'mysql2';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Promise wrapper for async/await
const promisePool = pool.promise();

// Connect and test the DB
export const connectDB = async () => {
  try {
    await promisePool.query('SELECT 1');
    console.log('MySQL Connected:', process.env.DB_HOST);
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    process.exit(1);
  }
};

export { promisePool as db };
