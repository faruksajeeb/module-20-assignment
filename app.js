const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const path = require("path");

// Datatabse
const mongoose = require("mongoose");

// Routes
const router = require("./src/routes/api");

//Security
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());

// Rate Limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);


let URI="mongodb+srv://<username>:<password>@cluster0.f0lznne.mongodb.net/mern-ecommerce";
let OPTION={user:'dgdg',pass:'3534545',autoIndex:true};
mongoose.connect(URI,OPTION).then((res)=>{
    console.log("Database Connected!")
}).catch((err)=>{
    console.log(err)
})



// Backend Routing
app.use("/api", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;
