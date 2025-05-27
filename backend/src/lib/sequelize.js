import { Sequelize } from 'sequelize';

// Create Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,     // database name
  process.env.DB_USER,     // username
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST,     // database host
    dialect: 'mysql',              // dialect
    port: process.env.DB_PORT || 3306,
    logging: false,                // set to true to see SQL queries
  }
);

// Test connection (optional helper)
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established.');
  } catch (error) {
    console.error('❌ Unable to connect to MySQL:', error);
    process.exit(1);
  }
};

export default sequelize;
