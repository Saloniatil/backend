/////////////////////////////////////////////////////////GET///////////////////////////////////////////////////////////
const connection = require("../Model/db");
const getData = async (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM tbl_admin_role`;
    await connection.query(sqlQuery, (err, result) => {
      if (err) {
        res.json("error", err.sqlMessgae);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.send({ status: 500, Error: error.meassage });
  }
};
//////////////Get role by id////////////////
const getRolebyid = async (req, res) => {
  try {
    const role_id = req.params.role_id; // Assuming srno is passed as a parameter in the request
    const sqlQuery = `SELECT * FROM  tbl_admin_role WHERE  role_id = ?`; // Adjust column names as per your database schema
    await connection.query(sqlQuery, [role_id], (err, result) => {
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

////////////////////POST/////////////////////
const postData = async (req, res) => {
  try {
    const sqlQuery = "INSERT INTO tbl_admin_role SET ?";
    let data = {
      role_id: req.body.role_id,
      role_name: req.body.role_name,
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
    console.log("error", err);
    res.status(500).send({ error: "server Error" });
  }
};

////////////////////////UPDATE////////////////////////
const putData = (req, res) => {
  const id = req.params.role_id;
  const sql = `UPDATE tbl_admin_role
    set  role_name = ? Where role_id = ?`;
  const values = [req.body.role_name];
  connection.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

////////////////////////////////////DELETE//////////////////////////
const deleteData = (req, res) => {
  try {
    const role_id = req.params.role_id;
    const sql = "delete from tbl_admin_role where role_id = ?";
    connection.query(sql, [role_id], (err, result) => {
      console.log(err);
      if (err) return res.json({ Status: false, Error: "Query Error" + err });
      return res.json({ Status: true, Result: result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server Error" });
  }
};
module.exports = { getData, postData, putData, deleteData, getRolebyid };
