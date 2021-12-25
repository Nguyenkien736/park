


const User=require("./modules/User")
const router=require("express").Router()
const Role=require("./modules/Role")
//Register
router.post('/resgister',async (req,res)=>{
    console.log(req.body.role)
    //const roleRequest= await Role.findOne({name:req.body.role})
   

    const user=await new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,

      //  role: roleRequest._id
    })


    try{
    await user.save()
   
    res.redirect('/api/auth/login')
    }catch (err) {
        console.log(err)
    }

})


//LOGIN
router.post("/login",async (req,res)=>{
    try{
    const user=await User.findOne({username:req.body.username})
    !user&&res.status(404).json("user not found")

    if(user.password!=req.body.password){
        res.status(400).json("wrong password")
    }else{
        const role = await Role.findById(user.role);
        

        if(role.name=='Employee') res.redirect('../../api/user/employee/GamePrice')
        else if(role.name=='Client') res.redirect('/api/user/client/info/'+user._id)
        else res.redirect("/api/user/admin")
    }

    }catch(err){
        console.log(err)
    }
})

router.get("/login",async (req,res)=>{
    res.render("login_signup/login")
})
router.get("/signup",async (req,res)=>{
    res.render("login_signup/signup")
})


module.exports= router