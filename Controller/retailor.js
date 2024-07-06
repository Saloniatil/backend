//////////////////////////GET////////////////////////////////
const connection = require("../Model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getData = async (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM retailor`;
    await connection.query(sqlQuery, (err, result) => {
      if (err) {
        res.status(500).json({ Status: false, Error: err.sqlMessage });
      } else {
        res.status(200).json({ Status: true, Result: result });
      }
    });
  } catch (error) {
    res.status(500).json({ Status: false, Error: error.message });
  }
};


///////////////////////////////////////GET by id///////////////////////////

const getDatasrno = async (req, res) => {
  try {
      const regno = req.params.regno; // Assuming srno is passed as a parameter in the request
      const sqlQuery = `SELECT * FROM retailor WHERE regno = ?`; // Adjust column names as per your database schema
      await connection.query(sqlQuery, [regno], (err, result) => {
           if (err) {
              res.status(500).json({ Status: false, Error: err.sqlMessage });
          } else {
              if (result.length === 0) {
                  // If no result found for the provided srno
                  res.status(404).json({ Status: false, Error: "No data found for the provided regno" });
              } else {
                  res.status(200).json({ Status: true, Result: result });
              }
          }
      });
  } catch (error) {
      res.status(500).json({ Status: false, Error: error.message });
  }
};

///////////////////////////////POST with Bcrypt//////////////////////////////
const postData = async (req, res) => {
  console.log(req.body)
  try {
    const sqlQuery = "INSERT INTO retailor SET ?"; 
      let data = {
        id: req.body.id,
        Task_name: req.body.Task_name,
        Date: req.body.Date,
        Status: req.body.Status,
        Image: req.file.location,
      };
      console.log(data)
      await connection.query(sqlQuery, data, function (err, result) {
        if (err) {
          console.log("Error", err);
          res.status(500).send({ error: "error in server" });
        } else {
          console.log(result);
          res.send(result);
        }
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: "server Error"});
  }
};
 
 
 
////////////////////////UPDATE////////////////////////////////////////////////
const putData = (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE retailor
    set Task_name = ?, Date =?,  Status = ?
    Where id = ?`;
    const values = [
      req.body.Task_name,
      req.body.Date,
      req.body.Status,
    ];
    connection.query(sql, [...values, id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" + err });
      return res.json({ Status: true, Result: result });
    });
};
/////////////////////////////DELETE////////////////////////////////////////
const deleteData = (req, res) => {
  try {
      const id = req.params.id;
      const sql = "delete from retailor where id = ?";
      connection.query(sql, [id], (err, result) => {
          console.log(err);
          if (err) return res.json({ Status: false, Error: "Query Error" + err });
          return res.json({ Status: true, Result: result });
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Server Error" });
  }
};

///////////////status ////////////
const activedata = (req, res) => {
  const id = req.params.id;
  const status = req.params.Status;
  console.log(id)
  console.log(status)
  const sql = `UPDATE retailor set Status = ? Where id = ?`
  connection.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log("Error:", err.sqlMessage);
      res.status(500).json({error: err.sqlMessage})
      // res.send(err);
    } else {
      res.send(result)
    }
  })
}
// module.exports = { getData, postData, putData, create };
module.exports = { getData, postData, getDatasrno, putData, deleteData, activedata };
