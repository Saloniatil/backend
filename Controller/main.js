const db = require('../Modle/modle')
const express = require('express')
const app = express();

const bcrypt = require('bcrypt')
const cookies = require('cookie-parser')
app.use(cookies())
const jwt = require('jsonwebtoken')
// const secretKey = "secret_key_1234"
const salt =10;
app.use(express.json())

const retailer_data_get = (req, res) =>{
    const sql = SELECT * FROM tbl_retailer_register
    db.query(sql,(err, result)=>{
        if(err){
            console.log("Retailer data not get")
            res.json(err)
        }else{
            console.log("Retailer data get success fully")
            res.json(result)
        }
    })
}

const retailerdata_get = (req, res) =>{
    const regno = req.params.regno;
    const sql = SELECT * FROM tbl_retailer_register WHERE regno = ?

    db.query(sql, [regno], (err, result)=>{
        if(err){
            console.log("Not Get Data", err)
            res.json(err)
        }else{
            console.log("Get Data SuccessFully...")
            res.json(result)
        }
       
    })
}
const retailer_datapost = (req, res) =>{
    try{
        const sql = INSERT INTO tbl_retailer_register SET ?
        
        bcrypt.hash(req.body.password.toString(), salt, (err, hash)=>{
            if(err) return res.json({Error:"Error in hashing password"})
            // console.log(req.files)
            const data = {
                regno:req.body.regno,
                GST_no:req.body.GST_no,
                TIN_no:req.body.TIN_no,
                PAN:req.body.PAN,
                shop_name:req.body.shop_name,
                owner_name:req.body.owner_name, 
                contact:req.body.contact, 
                mobile:req.body.mobile, 
                web:req.body.web, 
                email:req.body.email, 
                address:req.body.address, 
                state:req.body.state, 
                city:req.body.city, 
                pin:req.body.pin,
                document_reg_no:req.files[0].filename, 
                docpan:req.files[1].filename, 
                shop_doc:req.files[2].filename, 
                terms_and_conditions:req.body.terms_and_conditions, 
                status:req.body.status, 
                password:hash,
            } 
            db.query(sql, data, (err, result)=>{
                if(err){
                    console.log("Retailer data Not Post...", err)
                    res.json(err)
                }else{
                    console.log("Retailer data Post SuccessFully....")
                    res.json(result)
                }
            })
        })
       
    }catch(err){

    }
}



const retailer_login = (req, res) => {
const password = req.body.password
const email = req.body.email

    // const { email, password } = req.body;
    // console.log(req.body.password)
    const sql = SELECT * FROM tbl_retailer_register WHERE email=?;
    db.query(sql, [email, password], (err, result) => { 
        if (result && result.length > 0) { 
            // console.log(result[0].password, password)
            bcrypt.compare(password, result[0].password, (err, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ email: result[0].email, regID: result[0].regno }, "jwt-secret-key", { expiresIn: "1d" });
                    // console.log("Generated Token:", token); 
                    res.cookie('token', token);
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

const logout = (req, res) =>{ 
    res.clearCookie('token');
    return res.json({Status: "Success"})
}


const getUserdata = (req, res)=>{
    return res.json({email:req.email, regID:req.regno})
}


const retailer_dataupdate = (req, res) =>{
    const data = req.body; 
    const regno = req.params.regno;
    const sql = UPDATE tbl_retailer_register SET ? WHERE regno = ?

    db.query(sql, [data, regno], (err, result)=>{
        if(err){
            console.log("Retailer data not update...", err)
            res.json(err)
        }else{
            console.log("Retailer data update successfully....")
            res.json(result)
        }
    })
}

module.exports = {retailer_data_get,retailerdata_get, retailer_datapost, retailer_dataupdate, getUserdata, retailer_login, logout}