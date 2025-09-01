const express=require('express');
require("dotenv").config();
const {Pool}=require("pg");
const app=express();
app.use(express.json());//Built in middleware to parse JSON request bodies
const pool=new Pool({
    user:process.env.PGUSER,
    host:process.env.PGHOST,
    password:process.env.PGPASSWORD,
    database:process.env.PGDATABASE,
    port:process.env.PGPORT,
});
pool.connect()
.then(()=>console.log("connected to PostgreSQL"))
.catch(err=>console.error("connection error",err.stack));

app.get('/',(req,res)=>{
    res.end("Hello form PostgreSQL Task Manager API");
});
app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});