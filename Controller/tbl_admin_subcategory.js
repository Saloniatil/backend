const { error } = require("console");
const connection = require("../Model/db");

const getData = async (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM tbl_admin_subcategory`;
    await connection.query(sqlQuery, (err, result) => {
      if (err) {
        res.json("error", err.sqlMessage);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.send({ status: 500, Error: error.message });
  }
};

//////////////////////////////POST///////////////////////////////
// const postData = async (req, res) => {
//   try {
//     const sqlQuery = "INSERT INTO tbl_admin_subcategory SET ?";
//     let data = {
//       P_Category_Id: req.body.P_Category_Id,
//       subcategory_id: req.body.subcategory_id,
//       subcategory_name: req.body.subcategory_name,
//       photo: req.file.location,
//       // photo: req.file.location,
//       addedon: req.body.addedon,
//     };
//     console.log(data);
//     await connection.query(sqlQuery, data, function (err, result) {
//       if (err) {
//         console.log("Error", err);
//         res.status(500).send({ error: "error in server" });
//       } else {
//         console.log(result);
//         res.send(result);
//       }
//     });
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).send({ error: "server Error" });
//   }
// };

const postData = async (req, res) => {
  console.log(req.body);
  try {
    const sqlQuery = "INSERT INTO tbl_admin_subcategory SET ?";
    let data = {
      P_Category_Id: req.body.P_Category_Id,
      subcategory_id: req.body.subcategory_id,
      subcategory_name: req.body.subcategory_name,
      // photo: req.file.filename,
      photo: req.file.location,
      addedon: req.body.addedon,
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
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error: "server Error" });
  }
};

///////////////////UPDATE////////////////////

// const putData = (req, res) => {
//   const id = req.params.subcategory_id;
//   const sql = `UPDATE tbl_admin_subcategory set subcategory_name = ? Where subcategory_id = ?`;
//   const values = [req.body.subcategory_name];
//   connection.query(sql, [...values, id], (err, result) => {
//     if (err) return res.json({ Status: false, Error: "Query Error" + err });
//     return res.json({ Status: true, Result: result });
//   });
// };

const putData = async (req, res) => {
  try {
    const subcategory_id = req.params.subcategory_id;
    let userData = req.body;
    let sqlQuery = `UPDATE tbl_admin_subcategory set? Where subcategory_id =? `;
    await connection.query(
      sqlQuery,
      [userData, subcategory_id],
      function (error, result) {
        if (error) {
          console.log("error", error.sqlMessage);
          return res.status(500).json({ error: "Error updating data" });
        } else {
          console.log(result);
          res.status(200).json({ message: "User updated sucessfully" });
        }
      }
    );
  } catch (error) {
    console.log("error found");
  }
};
///////////////////////////UPDATE for an Image///////////////////// const putData = async (req, res) => {
const UpdateImage = async (req, res) => {
  try {
    const subcategory_id = req.params.subcategory_id;
    let userData = req.file.location;
    let sqlQuery = `UPDATE tbl_admin_subcategory set photo = ? Where subcategory_id =? `;
    console.log(userData, subcategory_id);
    await connection.query(
      sqlQuery,
      [userData, subcategory_id],
      function (error, result) {
        if (error) {
          console.log("error", error.sqlMessage);
          return res.status(500).json({ error: "Error updating data" });
        } else {
          console.log(result);
          res.status(200).json({ message: "User updated sucessfully" });
        }
      }
    );
  } catch (error) {
    console.log("error found");
  }
};
//////////////////////////////DELETE////////////////////////////////
const deleteData = (req, res) => {
  try {
    const subcategory_id = req.params.subcategory_id;
    const sql = "delete from tbl_admin_subcategory where subcategory_id = ?";
    connection.query(sql, [subcategory_id], (err, result) => {
      console.log(err);
      if (err) return res.json({ Status: false, Error: "Query Error" + err });
      return res.json({ Status: true, Result: result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = { getData, postData, putData, deleteData, UpdateImage };
