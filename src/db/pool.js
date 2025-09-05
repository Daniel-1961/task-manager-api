const {Pool}=require('pg');
const logger=require('../utils/logger');
const pool=new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
   
});
async function initDb(){
    const client=await pool.connect();
    try{
        await client.query('SELECT 1');
        logger.info('✅ Connected to PostgreSQL');
    }finally{
        client.release();
    }
}
module.exports={pool,initDb};