const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === "true" ? {
    rejectUnauthorized: false
  } : false
});

const runSQLScript = async (scriptName = 'init.sql') => {
  const filePath = path.join(__dirname, scriptName);
  
  if (!fs.existsSync(filePath)) {
    console.error(`Script file ${scriptName} does not exist!`);
    return;
  }
  
  const sql = fs.readFileSync(filePath, 'utf8');

  try {
    await pool.query(sql);
    console.log(`Script SQL ${scriptName} executado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao executar o script SQL ${scriptName}:`, err);
  } finally {
    await pool.end();
  }
};

// Get script name from command line args
const scriptName = process.argv[2] || 'init.sql';
runSQLScript(scriptName);
