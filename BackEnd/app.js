const express = require("express")
const app = express()
const Api = require("./Routes/Api")
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api" ,Api)
app.listen(3000)