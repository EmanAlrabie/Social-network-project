//we import esm package which allow us to use import syntax rethar than require
require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors"; //beacuse the frontend and the backend run in diffrent port so we need to cors to prevent errors
const morgan = require("morgan"); //it doesn't support import syntax
import {readdirSync} from 'fs' // to read all files in directory without need to import every one



const app = express();

//connect with db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(`DB connect err: ${err}`);
  });

//middlewares
app.use(express.json()); //it middleware help to get json data.
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// load routes 
readdirSync('./routes').map((r)=>{
  //routes middlewares
  app.use("/api",require(`./routes/${r}`)) //prefix, rout file
})


const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})