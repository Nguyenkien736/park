const express=require("express")
const helmet=require("helmet")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const morgan=require("morgan")
const userRoute=require("./route/user")
const authRoute=require("./route/auth")

var bodyParser = require('body-parser');


dotenv.config()
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true},()=>{
    console.log("connected to database")
})

const app=express()
//MiddleWare
app.set('view engine','ejs')
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.get("/",(req,res)=>{
    res.render("login_signup/login")
})

app.use(express.static('views'));

app.listen(8800,()=>{
    console.log("backend is running")
})