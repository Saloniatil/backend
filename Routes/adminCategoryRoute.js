const express = require("express");
const categoryRoute = express.Router()
 

//swagger //
/**
 *  @swagger 
 *  components:
 *   schemas:
 *    tbl_admincategory:
 *       type: object
 *       properties:
 *          P_Category_Id:
 *           type: number
 *          Category_name:
 *           type: string
 */

/**
 *  @swagger
 *  /getdata:
 *    get:
 *     summary: Get data 
 *     description: Get method to retrieve data 
 *     responses:
 *        200:
 *         description: Successfully retrieved data
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/tbl_admincategory'
 */
/**
 *  @swagger
 *  /postdata:
 *    post:
 *      summary: Add a new data
 *      description: Add new data
 *      requestBody:
 *        required: true
 *        content: 
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/tbl_admincategory'
 *      responses:
 *        200:
 *      description: added successfully
 */

/**
 *  @swagger
 * /putdata/{P_Category_Id}:
 *  put:
 *   summary: Update data
 *   description: Update data by P_Category_Id 
 *   parameters:
 *     - in: path
 *       name: P_Category_Id 
 *       description: P_Category_Id to update
 *       required: true
 *       schema:
 *         type: string
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/tbl_admincategory'
 *    responses:
 *      200:
 *        description: Data updated successfully
 */

/**
 * @swagger
 * /deleteData/{P_Category_Id}
 *  delete: 
 *   summary: Delete data
 *   description: Delete data by P_Category_Id
 *   parameters:
 *     - in: path
 *       name:P_Category_Id
 *       description: P_Category_Id to delete
 *       schema:
 *         type: string
 *    responses:
 *       200:
 *        description: Data deleted successfully
 */

const {getData, postData, putData, deleteData} = require("../Controller/tbl_admin_category.js");
 
categoryRoute.get('/api/getcategory', getData);
categoryRoute.post('/api/post/category', postData);
categoryRoute.put('/putcategory/:P_Category_Id', putData);
categoryRoute.delete('/deletecategory/:P_Category_Id', deleteData)
 
module.exports = categoryRoute; 

 