const connection = require("../Model/db");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookies = require("cookie-parser");
app.use(cookies());
const jwt = require("jsonwebtoken");

const salt = 10;
app.use(express.json());

//////////////////////////////////Get data/////////////////////
const getdata = async (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM register`;
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

////////////=================register ===================///////////////
const postData = async (req, res) => {
  try {
    const sqlQuery = "INSERT INTO registerdata  SET ?";
    bcrypt.hash(req.body.password.toString(), 10, async (err, hash) => {
      if (err) {
        console.log("Error in hashing password:", err);
        return res.status(500).json({ Status: false, Error: "Query Error" });
      }
      let data = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
      };
      console.log(data);
      await connection.query(sqlQuery, data, function(err, result) {
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

///////////////////post with login/////////////////////////////////////////
const postloginData = async (req, res) => {
  try {
    const sqlQuery = "INSERT INTO signin SET ?";
    bcrypt.hash(req.body.password.toString(), 10, async (err, hash) => {
      if (err) {
        console.log("Error in hashing password:", err);
        return res.status(500).json({ Status: false, Error: "Query Error" });
      }
      let data = {
        email: req.body.email,
        password: hash,
      };
      console.log(data);
      await connection.query(sqlQuery, data, function(err, result) {
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

/////Update the status by toggle/////

///////////////////////////post with comparing password in login//////////////
// const register_login = async  (req, res) => {
//   const sql = "SELECT * from retailor Where email = ? and password = ?";
//   connection.query(sql, [req.body.email, req.body.password], (err, result) => {
//     if (err) return res.json({ loginStatus: false, Error: "Query error" });
//     if (result.length > 0) {
//       const email = result[0].email;
//       const token = jwt.sign(
//         { role: "retailor", email: email },
//         "jwt_secret_key",
//         { expiresIn: "1d" }
//       );
//       res.cookie('token', token)
//       return res.json({ loginStatus: true });
//     } else {
//       return res.json({ loginStatus: false, Error: "wrong credentials" });
//     }
//   });
// };
const retailer_login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  // const { email, password } = req.body;
  // console.log(req.body.password)
  const sql = `SELECT * FROM  retailor WHERE email=?`;
  connection.query(sql, [email, password], (err, result) => {
    if (result && result.length > 0) {
      // console.log(result[0].password, password)
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            { email: result[0].email, regID: result[0].regno },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          // console.log("Generated Token:", token);
          res.cookie("token", token);
          return res.status(200).json({ result: result, token: token });
        } else {
          return res.status(401).json("Password not match");
        }
      });
    } else {
      return res.status(404).json("User not Found");
    }
  });
};

/// login post Api//
//  const login = (req, res) => {
//   const sql = "SELECT * from retailor Where email = ? and password = ?";
//   con.query(sql, [req.body.email, req.body.password], (err, result) => {
//     if (err) return res.json({ loginStatus: false, Error: "Query error" });
//     if (result.length > 0) {
//       const email = result[0].email;
//       const token = jwt.sign(
//         { role: "admin", email: email },
//         "jwt_secret_key",
//         { expiresIn: "1d" }
//       );
//       res.cookie('token', token)
//       return res.json({ loginStatus: true });
//     } else {
//       return res.json({ loginStatus: false, Error: "wrong credentials" });
//     }
//   });
// };
const getUserdata = (req, res) => {
  return res.json({ email: req.email, regID: req.regno });
};
module.exports = { getdata, postData, postloginData, getUserdata };
