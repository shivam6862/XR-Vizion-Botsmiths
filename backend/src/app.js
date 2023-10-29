const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoConnect = require("./db/db").mongoConnect;
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const fileUpload = require("express-fileupload");
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/uploads/"));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, AuthToken"
  );
  next();
});

routes.forEach((route) => app[route.method](route.path, route.handler));

const start = async () => {
  mongoConnect(() => {
    app.listen(8080, () => {
      console.log("Server is listening on Port 8080");
    });
  });
};

start();
