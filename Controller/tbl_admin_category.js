const connection = require("../Model/db");

const getData = async (req, res) => {
    try {
        const sqlQuery = `SELECT * FROM tbl_admin_category`;
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
  
////////////////////////////POST//////////////////////////////
const postData = async (req, res) => {
    try {
        const sqlQuery = "INSERT INTO tbl_admin_category  SET ?";
        let data = {
            P_Category_Id: req.body.P_Category_Id,
            Category_name: req.body.Category_name,
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


//////////////////////UPDATE API//////////////////////////////////
const putData = (req, res) => {
    const id = req.params.P_Category_Id;
    const sql = "UPDATE tbl_admin_category set Category_name=? Where P_Category_Id = ?";
    const values = [req.body.Category_name];
    connection.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
};



/////////////////////////////DELETE//////////////////////////
const deleteData = (req, res) => {
    try {
        const P_Category_Id = req.params.P_Category_Id;
        const sql = "delete from tbl_admin_category where P_Category_Id = ?";
        connection.query(sql, [P_Category_Id], (err, result) => {
            console.log(err);
            if (err) return res.json({ Status: false, Error: "Query Error" + err });
            return res.json({ Status: true, Result: result });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server Error" });
    }
};
module.exports = { getData, postData, putData, deleteData };