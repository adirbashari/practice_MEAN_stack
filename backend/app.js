const express = require("express");
const app = express();
const mongoose = require("mongoose")
const MongoDBConnectionString  = require("./secret-MongoDB-connection-string");
const postsRoutes= require("./routes/posts");
const path  =require("path");

mongoose.connect(MongoDBConnectionString)
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts",postsRoutes);


module.exports = app;
