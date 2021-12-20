const router=require("express").Router()
const User=require("./modules/User")
const Role=require("./modules/Role")

//crud
router.get('/',(req,res)=>{
    
    res.render("admin/home")
})

router.get('/assign_role',(req,res)=>{
    res.render('admin/assignRole',{client:false})
})

router.post('/assign_role',(req,res)=>{
    User.findOne({username: req.body.username},(err,user)=>{
        const role=Role.findById(user.role,(err,rol)=>{
            res.render('admin/assignRole',{client:user,role: rol.name})

        })
        
    })

    


})
router.post('/deleteuser/:userID',(req,res)=>{
    User.findById(req.params.body,(err,user)=>{
        if(!user) res.redirect("/api/user/admin")
        else{
            user.remove()
            res.redirect("api/user/admin")
        }
    })
})

router.post('/updateUser',(req,res)=>{
    User.findById(req.body.clientID,(err,user)=>{
        console.log(req.body.role)
        Role.findOne({name:req.body.role},(err,rol)=>{
            
            user.role=rol._id
            user.save()
            res.render('admin/assignRole',{client:user,role:rol.name})

        })
    })
    


})
module.exports= router