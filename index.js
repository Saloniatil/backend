const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const joi = require("joi");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cookies = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(cookies());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use(notFoundHandler);
// app.use(errorHandler);

dotenv.config();
const adminRoute = require("./Routes/adminRoute");
app.use("/", adminRoute);

// app.use(bodyParser.json());

///////////////////////////////////////////////////////////SWAGGER////////////////////////////////////////////////////////////////

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "NODE JS API DOCUMENTATION BY SALONI PATIL",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8083",
      },
    ],
  },
  apis: ["./Routes/adminRoute.js"], // Path to your route file
  // apis: ["./Routes/adminRoleRoute.js"],
  // apis: ["./Routes/adminCategoryRoute.js"],
  // apis: ["./Routes/adminSubcategoryRoute.js"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const schema = joi.object({
  id: joi
    .number()
    .min(1)
    .max(5)
    .required(),
  name: joi
    .string()
    .min(2)
    .max(150)
    .required(),
  email: joi
    .string()
    .min(1)
    .max(100)
    .required(),
  password: joi
    .string()
    .min(1)
    .max(50)
    .required(),
  mobile: joi
    .string()
    .min(1)
    .max(50)
    .required(),
  photo: joi
    .string()
    .min(1)
    .max(100)
    .required(),
  aadhar: joi
    .string()
    .min(1)
    .max(100)
    .required(),
  doj: joi
    .string()
    .min(1)
    .max(100)
    .required(),
  qualification: joi
    .string()
    .min(1)
    .max(100)
    .required(),
  dob: joi
    .string()
    .min(1)
    .max(100)
    .required(),
  address: joi
    .string()
    .min(1)
    .max(100)
    .required(),
  state: joi
    .string()
    .min(1)
    .max(100)
    .required(),
  city: joi
    .string()
    .min(1)
    .max(100)
    .required(),
  pin: joi
    .number()
    .min(1)
    .max(100)
    .required(),
  status: joi
    .string()
    .min(2)
    .max(100)
    .required(),
});

const admin = require("../Server/Routes/adminRoute");
app.use("/", adminRoute);

// const  admin_Route = require('../Server/Routes/admin_Route.js')
// app.use("/",  admin_Route);

const roleRoute = require("../Server/Routes/adminRoleRoute");
app.use("/", roleRoute);

const categoryRoute = require("../Server/Routes/adminCategoryRoute");
app.use("/", categoryRoute);

const subcategoryRoute = require("../Server/Routes/adminSubcategoryRoute");
app.use("/", subcategoryRoute);

const retailorRoute = require("../Server/Routes/retailorRoute");
app.use("/", retailorRoute);

const registerRoute = require("../Server/Routes/registerRoute.js");
const { disconnect } = require("process");
app.use("/", registerRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server Start");
});
