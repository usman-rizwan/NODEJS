const express = require("express");
const app = express();
const mongoose = require('./config/db');

const db = mongoose.connection;

db.once("open",()=>{
    console.log("Database connected")
})

app.use(express.json())

app.use('/', require('./router'))

app.listen(3000, () => {
    console.log("Mera server 3000 per chalu he..")
})