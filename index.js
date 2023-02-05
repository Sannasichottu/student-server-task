const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const cors = require('cors');

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Dhosanjay7",
    database:"student_crud"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//Get - Student
app.get("/api/get",(req,res) => {
    const sqlGet = "SELECT * FROM student_db";
    db.query(sqlGet,(error,result) => {
        res.send(result)
    })
});

// Create - Student
app.post("/api/post",(req,res) => {
    const {firstname, lastname, location, email, dob, education, about} = req.body;
    const sqlInsert = "INSERT INTO student_db (firstname, lastname, location, email, dob, education, about) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert,[firstname,lastname,location,email,dob,education, about ],(error,result) => {
        if(error) {
            console.log(error);
        }
    })
})

// Delete - Student
app.delete("/api/remove/:id",(req,res) => {
    const {id} = req.params;
    const sqlRemove = "DELETE FROM student_db WHERE id = ?";
    db.query(sqlRemove,id,(error,result) => {
        if(error) {
            console.log(error);
        }
    })
})

// Get - single Student
app.get("/api/get/:id",(req,res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM student_db WHERE id = ? ";
    db.query(sqlGet, id, (error,result) => {
        if(error) {
            console.log(error);
        }
        res.send(result)
    })
});

// Update - Student
app.put("/api/update/:id",(req,res) => {
    const {id} = req.params;
    const {firstname, lastname, email,location,dob,education,about} = req.body;
    const sqlUpdate = "UPDATE student_db SET firstname = ?, lastname = ?, email = ?, location = ?, dob = ? , education = ?, about =? WHERE id = ? ";
    db.query(sqlUpdate, [firstname, lastname, email,location, dob, education, about, id], (error,result) => {
        if(error) {
            console.log(error);
        }
        res.send(result)
    })
});


app.get("/", (req,res) => {
/*
    const sqlInsert = "INSERT INTO student_db (firstname, lastname, location, email, dob, education) VALUES ('sannasi', 'marimuthu', 'kovilpatti', 'sannasi@gmail.com', '2000-03-21', 'MSc')";
    db.query(sqlInsert,(error,result) => {
        console.log("error",error);
        console.log("result",result);
        res.send("Hello nanba")
    })
*/
})




app.listen(5000,() => {
    console.log("Server is running on port 5000");
})
