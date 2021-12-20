const router=require("express").Router()
const User=require("./modules/User")

//crud
//update
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          //const salt = await bcrypt.genSalt(10);
          //req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });


//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });



//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/ticket_auth',async (req,res)=>{
    const user= await User.findOne({username:req.body.username})
    const token = true;
    if(token){
        
    }
})

router.post('/vip_resgister',(req,res)=>{
  


})
router.get('/ticket_status',(req,res)=>{

})




router.get("/dangkyvip/:userID",(req,res)=>{
  

})
router.get("/info/:userID",(req,res)=>{
  User.findById(req.params.userID,(err, client) =>{
    if (err) {
      console.log(err);
      throw err
  }
  
  res.render('client/info', { client: client });

  })
  

})
router.post("/infomod/:userID",async (req,res)=>{

  User.findById(req.params.userID,(err, client) =>{
    if (err) {
      console.log(err);
      throw err
  }
  client.name=req.body.name
  client.phonenumber=req.body.phonenumber
  client.email=req.body.email
  client.save()
}
)
  
  
  res.redirect('/api/user/client/info/'+req.params.userID)

  
  

})

router.get("/update-account/:userID",(req,res)=>{
  User.findById(req.params.userID,(err,user)=>{
    res.render("client/update-info",{client:user})
  })
 
})

"/api/user/client/dangkyvip"
"/api/user/client/info"
router.get("/tiketstatus/:userID",(req,res)=>{
  User.findById(req.params.userID,(err,client)=>{
    if(err)
    console.log(err)
    res.render("client/ticketstatus",{client:client})
  })


}
)

router.get("/muave/:userID",(req,res)=>{
  console.log("hello")
  User.findById(req.params.userID,(err,client)=>{
    if(err)
    console.log(err)
    res.render("client/buyticket",{client:client})
  })


}
)
//"/api/user/client/changepassword/<%= client._id %>"
"/api/user/client/update-account/"+'<%= client._id %>'


module.exports= router