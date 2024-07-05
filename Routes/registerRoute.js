const path = require("path");
const express = require("express");
const registerRoute = express.Router()
registerRoute.use(express.json())
const cors = require('cors')
let multerS3 = require("multer-s3");
let multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3")
const jwt = require("jsonwebtoken")

const bucketName = process.env.BUCKET_NAME;

//store file in AWS S3 configuration
const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId:  process.env.ACCESKEYID,
        secretAccessKey: process.env.SECRETKEYID       
    }
})



const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(req.cookies.token)
    if (!token) {
        return res.status(401).json({ Error: "You are not Authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.status(401).json({ Error: "Token wrong" });
            console.log(decoded)
            req.email = decoded.email;
            req.regno = decoded.regID; // Change req.regno to req.regID
            next();
        });
    }
};
 
 

const {getdata, postData, postloginData, getUserdata } = require("../Controller/Register.js");
registerRoute.get('/get/register/retailor', getdata);
registerRoute.post('/api/post/register', postData);
registerRoute.post('/api/post/login', postloginData);
// registerRoute.post('/api/post/retailor/login', retailer_login);
registerRoute.get('/api/retailer/verify/getUserdata', verifyUser, getUserdata);
 

module.exports = registerRoute;