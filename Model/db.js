
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if(err)
    console.log("database not connected")
    else
    console.log("Connection established")
})

module.exports = connection;
