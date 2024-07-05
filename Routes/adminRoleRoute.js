const express = require("express");
const roleRoute = express.Router()


//swagger //
/**
 * @swagger
 * components:
 *   schemas:
 *      tbl_admin_role:
 *          type: object
 *          properties:
 *             role_id:
 *               type: string
 *             role_name:
 *               type: string
 */
/**
 * @swagger
 * /getdata:
 *   get:
 *    summary: Get data
 *    description: Get method to retrieve data
 *    responses:
 *      200:
 *        description: Succesfully retrieve data
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/tbl_admin_role'
 */

/**
 * @swagger
 * /postdata:
 *  post:
 *    summary: Add a new data
 *    description: Add new data
 *    requestBody:
 *      required:true
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/tbl_admin_role'
 *     responses:
 *        200:
 *          description: added successfully
 */

/**
 * @swagger
 * /putdata/{role_id}:
 *   put:
 *    summary: Update data
 *    description: Update data by ROLE_ID
 *    parameters:
 *      - in: path
 *        name: role_id
 *        description: ROLE_ID to update
 *        required: true
 *        schema:
 *          type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tbl_admin_role'
 *      responses:
 *        200: 
 *         description: Data updated succesfully
 * 
 */
/**
 * @swagger
 * /deleteData/{role_id};
 *  delete:
 *    summary: Delete data
 *    description: Delete data by role_id
 *    parameters:
 *      - in: path
 *        name: rid
 *        description: ROLE_ID to delete
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Data deleted succesfully
 */
const {getData, getRolebyid, postData, putData, deleteData} = require("../Controller/tbl_admin_role.js");
roleRoute.get('/api/getrole', getData);
roleRoute.get('/api/getrole/:role_id', getRolebyid)
roleRoute.post('/api/post/postrole', postData);
roleRoute.put('/api/putrole/:role_id', putData);
roleRoute.delete('/deleterole/:role_id', deleteData)
 
module.exports = roleRoute;

 