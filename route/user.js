

const router=require("express").Router()
const clientRoute=require("./client")
const employeeRoute=require("./employee")
const adminRoute=require("./admin")
const User=require("./modules/User")
const Role=require("./modules/Role")
//auth
router.post('/',async (res,req)=>{
    const user=await User.findOne({username:res.body.username})
    const userRole=await Role.findOne({_id:user.role})
    if(userRole.name=="Admin") req.status(200).json("Admin")
    else if(userRole.name=="Employee") req.status(200).json("Employee")
    else if(userRole.name=="Client") req.status(200).json("Client")
})

router.use('/client',clientRoute)
router.use('/employee',employeeRoute)
router.use('/admin',adminRoute)


module.exports= router