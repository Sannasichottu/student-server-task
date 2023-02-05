const router = require('express').Router();
const mysql = require("mysql2");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Dhosanjay7",
    database:"student_crud"
})

router.get("/get",(req,res)=> {
    const sqlGet = 'SELECT * FROM student_db';
    db.query(sqlGet,(error,result) => {
        res.send(result);
    })
})

module.exports = router