const path = require("path");
const express = require("express");
const subcategoryRoute = express.Router();
subcategoryRoute.use(express.json());
const cors = require("cors");
let multerS3 = require("multer-s3");
let multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;

//store file in AWS S3 configuration
const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId:  process.env.ACCESKEYID,
    secretAccessKey: process.env.SECRETKEYID
  },
});

//Storage Configuraion
let storage = multerS3({
  s3: s3,
  bucket: bucketName,
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, "Public/Images", { fieldName: file.fieldname });
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage });

//swagger //
/**
 * @swagger
 * components:
 *   schemas:
 *     tbl_adminsubcategory:
 *     type: object
 *     properties:
 *       P_Category_Id:
 *        type: string 
 *       subcategory_id:
 *        type: string
 *       subcategory_name:
 *        type: string
 *       photo:
 *        type: string
 *       addedon:
 *         type: string
 */

/**
 *  @swagger
 *  /getdata:
 *   get:
 *     summary: Get data
 *     description: Get method to retrieve data
 *     responses:
 *      200:
 *       description: Succesfully retrieved data
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *              items:
 *                $ref: '#/components/schemas/tbl_adminsubcategory' 
 */

/**
 * @swagger 
 * /getdata/{subcategory_id}:
 * get:
 *   summary: Get data
 *   description: Get methos to retrive data
 *   responses:
 *    200:
 *    description: Succesfully retrived data
 *    content:
 *      application/json:
 *       schema:
 *        type: array
 *         items:
 *          $ref: '#/components/schemas/tbl_adminsubcategory'
 * 
 */

/**
 * @swagger
 * /putdata/{subcategory_id}:
 *   put:
 *    summary: Update data
 *    description: Update data by subcategory_id
 *    parameters:
 *      - in: path
 *        name: subcategory_id
 *        description: SUBCATEGORY_ID to update
 *        required: true
 *        schema:
 *          type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             $ref: '#/components/schemas/tbl_adminsubcategory'
 *      responses:
 *       200:
 *         description: Data updated succesfully
 *   
 */

/**
 * @swagger
 * /deleteData/{subcategory_id}:
 *  delete:
 *   summary: Delete data
 *   description: Delete data by id
 *   parameters:
 *     - in: path
 *       name: uid
 *       description: SUBCATEGORY_ID to delete
 *       schema:
 *         type: string
 *   responses:
 *    200:
 *     description: Data deleted successfully
 * 
 * 
 */
const {getData, postData, putData, deleteData, UpdateImage} = require("../Controller/tbl_admin_subcategory.js");

subcategoryRoute.get("/api/get/subcategory", getData);
subcategoryRoute.post("/api/post/subcategory", upload.single("photo"), postData); 
subcategoryRoute.put("/put/subcategory/:subcategory_id", upload.single("photo"), putData);
subcategoryRoute.put("/put/image/:subcategory_id", upload.single("photo"), UpdateImage);
subcategoryRoute.delete("/delete/subcategory/:subcategory_id", deleteData);

module.exports = subcategoryRoute;
