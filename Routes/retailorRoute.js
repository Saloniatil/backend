const path = require("path");
const express = require("express");
const retailorRoute = express.Router()
retailorRoute.use(express.json())
const cors = require('cors')
let multerS3 = require('multer-s3');
let multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3")

const bucketName = process.env.BUCKET_NAME;

//store file in AWS S3 configuration 
const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId:  process.env.ACCESKEYID,
        secretAccessKey: process.env.SECRETKEYID
    }
})

//Storage Configuraion
let storage = multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, "Public/Images", { fieldName: file.fieldname })
    },
    filename: (req, file, cb) => {
        cb( null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
        },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage });

//image upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "Public/Images");
//     },
//     filename: (req, file, cb) => {
//         cb( null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     },
// });
// const upload = multer({
//     storage: storage,
// })
//swagger //
 /**
 * @swagger
 * components:
 *   schemas:
 *      tbl_adminusers:
 *          type: object
 *          properties:
 *             id:
 *               type: number
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: number
 *             mobile:
 *               type: string
 *             photo:
 *               type: string
 *             aadhar:
 *               type: number
 *             doj:
 *               type: string
 *             qualification:
 *               type: number
 *             dob:
 *               type: number
 *             address:
 *               type: string
 *             state:
 *               type: string
 *             city:
 *               type: number
 *             pin:
 *               type: string
 *             status:
 *               type: string
 */


/**
 * @swagger
 * /getdata:
 *   get:
 *     summary: Get data
 *     description: Get method to retrieve data
 *     responses:
 *       200:
 *         description: Successfully retrieved data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/tbl_adminusers'
 */

/**
 * @swagger
 * /postdata:
 *   post:
 *     summary: Add a new data
 *     description: Add new data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tbl_adminusers'
 *     responses:
 *       200:
 *         description:  added successfully
 */

/**
 * @swagger 
 * /putdata/{id}:
 *   put:
 *     summary: Update data
 *     description: Update data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tbl_adminusers'
 *     responses:
 *       200:
 *         description: Data updated successfully
 */

/**
 * @swagger 
 * /deleteData/{id}:
 *   delete:
 *     summary: Delete data
 *     description: Delete data by id
 *     parameters:
 *       - in: path
 *         name: uid
 *         description:  ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data deleted successfully
 */

 

const {getData, postData, getDatasrno, deletesrno, putData,  deleteData, getUserdata} = require("../Controller/retailor.js");
retailorRoute.get('/get/api/retailor', getData);
retailorRoute.post('/api/post/retailor', upload.single('Image'), postData);
retailorRoute.get('/api/getretailor/:regno', getDatasrno);
retailorRoute.put('/api/put/retailore/:id', putData)
// retailorRoute.delete('/delete', deletesrno);
retailorRoute.delete('/api/delete/retailore/:id', deleteData);
 
module.exports = retailorRoute;   