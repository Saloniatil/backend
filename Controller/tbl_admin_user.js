//////////////////////////GET////////////////////////////////
const connection = require("../Model/db");
const bcrypt = require("bcrypt");

/////////////////////GetData//////////////////////////
const getData = async (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM tbl_admin_user`;
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

////////////////////////////////Get user by id/////////////////////////////////////////
const getDatabyid = async (req, res) => {
  try {
    const id = req.params.id; // Assuming srno is passed as a parameter in the request
    const sqlQuery = `SELECT * FROM  tbl_admin_user WHERE  id = ?`; // Adjust column names as per your database schema
    await connection.query(sqlQuery, [id], (err, result) => {
      if (err) {
        res.status(500).json({ Status: false, Error: err.sqlMessage });
      } else {
        if (result.length === 0) {
          // If no result found for the provided srno
          res.status(404).json({
            Status: false,
            Error: "No data found for the provided id",
          });
        } else {
          res.status(200).json({ Status: true, Result: result });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ Status: false, Error: error.message });
  }
};

////////----------------------------Post with Bcrypt-------------------------------------/////////
const postData = async (req, res) => {
  try {
    const sqlQuery = "INSERT INTO tbl_admin_user SET ?";
    bcrypt.hash(req.body.password.toString(), 10, async (err, hash) => {
      if (err) {
        console.log("Error in hashing password:", err);
        return res.status(500).json({ Status: false, Error: "Query Error" });
      }
      let data = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        mobile: req.body.mobile,
        photo: req.file.location,
        aadhar: req.body.aadhar,
        doj: req.body.doj,
        qualification: req.body.qualification,
        dob: req.body.dob,
        address: req.body.address,
        state: req.body.state,
        city: req.body.city,
        pin: req.body.pin,
      };
      console.log(data);
      await connection.query(sqlQuery, data, function (err, result) {
        if (err) {
          console.log("Error", err);
          res.status(500).send({ error: "error in server" });
        } else {
          console.log(result);
          res.send(result);
        }
      });
    });
  } catch (error) {
    console.log("error", error); // use error instead of err
    res.status(500).send({ error: "server Error" });
  }
};

////////////////////////UPDATE////////////////////////////////////////////////
const putData = (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE tbl_admin_user
    set name = ?, email =?, password = ?,  mobile = ?, aadhar = ?, doj = ?,
    qualification = ?, dob = ?, address = ?, state = ?, city = ?, pin = ?
    Where id = ?`;
  bcrypt.hash(req.body.password.toString(), 10, async (err, hash) => {
    if (err) {
      console.log("Error in hashing password:", err);
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.mobile,
      req.body.aadhar,
      req.body.doj,
      req.body.qualification,
      req.body.dob,
      req.body.address,
      req.body.state,
      req.body.city,
      req.body.pin,
    ];
    connection.query(sql, [...values, id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" + err });
      return res.json({ Status: true, Result: result });
    });
  });
};


////////////////////UPDATE for an Image//////////////////////////
const UpdateImage = async (req, res) => {
  try {
    const id = req.params.id;
    let userData = req.file.location;
    let sqlQuery = `UPDATE tbl_admin_user set photo = ? Where id =?`;
    console.log(userData, id);
    await connection.query(
      sqlQuery,
      [userData, id],
      function (error, result) {
        if (error) {
          console.log("error", error.sqlMessage);
          return res.status(500).json({ error: "Error updating data" });
        } else {
          console.log(result)
          res.status(200).json({ message: "User updated successfully" });
        }
      }
    )
  } catch (error) {
    console.log("error found");
  }
}
/////////////////////////////DELETE////////////////////////////////////////
const deleteData = (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const sql = "Delete FROM tbl_admin_user WHERE id = ?";
    connection.query(sql, id, (err, result) => {
      console.log(err);
      if (err) return res.json({ Error: "delete employee error in sql" });
      return res.json({ Status: "Success" });
    });
  } catch (error) {}
};

module.exports = { getData, getDatabyid, postData, putData, deleteData, UpdateImage };
