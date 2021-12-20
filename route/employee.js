const router=require("express").Router()
//crud
router.get('/player_stats',(req,res)=>{
})
router.get('/game_status',(req,res)=>{
})
router.get('/facility_status',(req,res)=>{
})
router.post('/add_game',(req,res)=>{
})
router.post('/update_game',(req,res)=>{
})
router.post('/delete_game',(req,res)=>{
})


var express = require('express');

const Product = require('./modules/game');            //game
var Csvc = require('./modules/game');
const csvc = require('./modules/game');
const User=require('./modules/User')

// Loading GameInformation
router.get('/GameInformation', (req, res) => {
    Product.find({})
        .then(products => {
            res.render('GameInformation/home', { products: products })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

// Loading GameStatistics
router.get('/PlayStatistics', (req, res) => {
    res.render('PlayerStatistics/home');
});

// Loading GamePrice
router.get('/GamePrice', (req, res) => {
    Product.find({})
        .then(products => {
            res.render('GamePrice/home', { products: products })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
})

// Go to update product GameInformation
router.get('/GameInformation/update-product/:productId', (req, res) => {
    Product.findById(req.params.productId, (err, product) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.render('GameInformation/update-product', { product: product });
    })
});


// Update product with GameInformation
router.post('/GameInformation/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndUpdate(
        { _id: productId },
        { $set: { name: req.body.productName, type: req.body.productType, desc: req.body.productDetails } },
        { useFindAndModify: false })
        .then(doc => {
            res.redirect('/api/user/employee/GameInformation')
        })
});

// Go to Update product with GamePrice
router.get('/GamePrice/update-product/:productId', (req, res) => {
    Product.findById(req.params.productId, (err, product) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.render('./GamePrice/update-product', { product: product });
    })
});

// Update product with GamePrice
router.post('/GamePrice/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndUpdate(
        { _id: productId },
        { $set: { name: req.body.productName, type: req.body.productType, details: req.body.productDetails } },
        { useFindAndModify: false })
        .then(doc => {
            res.redirect('./')
        })
});

// Delete product
router.delete('/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndDelete(productId, (err, doc) => {
        if (err) throw err;
        res.send(doc);
    })
});

// Go to add product
router.get('/add-product', (req, res) => {
    res.render('GamePrice/add-product');
});
router.post("/updateClientTicket",(req,res)=>{
    User.findById(req.body.clientID,(err,client)=>{
        if(err) console.log(err)
        client.ticketexpired=req.body.ticketexpired
        client.ticketactivated=req.body.ticketactivated
        client.save()
    })
    res.redirect('/api/user/employee/search_user')




})
// Add new product
router.post('/',  (req, res) => {
    console.log(req.body.productName)
    const newProduct =  new Product({
        name: req.body.productName,
        type: req.body.productType,
        desc: req.body.productDetails,
    });
    console.log(req.body.productName)


     newProduct.save()
        .then(doc => {
          res.redirect('./GamePrice')
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

// Load csvc
router.get('/csvc', (req, res) => {
    Csvc.find({})
        .then(products => {
            res.render('CSVC/home', { products: products })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

// Go to Update product with GamePrice
router.get('/csvc/update-product/:productId', (req, res) => {
    Csvc.findById(req.params.productId, (err, product) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.render('CSVC/update-product', { product: product });
    })
});

router.post('/change_status/:product_id',(req,res)=>{
    Product.findById(req.params.product_id,(err,product)=>{
        const status = product.status
        product.status=!status
        product.save()
        res.redirect('/api/user/employee/csvc')
    })
})

router.post('/csvc/:productId', (req, res) => {
    let productId = req.params.productId;
    Csvc.findByIdAndUpdate(
        { _id: productId },
        { $set: { name: req.body.productName, type: req.body.productType, note: req.body.productDetails } },
        { useFindAndModify: false })
        .then(doc => {
            res.redirect('/api/user/employee/csvc')
        })
});

router.post("/search_user",(req,res)=>{
    User.findOne({username:req.body.username},(err,client)=>{
        if(err) console.log(err);
        else {
            res.render('findingClient/searchClient',{client:client})
        }


    })

})

router.get("/search_user",(req,res)=>{
    res.render('findingClient/searchClient',{client: false})    
})


// Go to add product
router.get('/csvc/add-product', (req, res) => {
    res.render('CSVC/add-product');
});

router.post('/csvc', (req, res) => {
    let newProduct = new Csvc({
        name: req.body.productName,
        type: req.body.productType,
        note: req.body.productDetails,
    });

    newProduct.save()
        .then(doc => {
            res.redirect('/api/user/employee/csvc')
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

router.delete('/csvc/:productId', (req, res) => {
    let productId = req.params.productId;
    Csvc.findByIdAndDelete(productId, (err, doc) => {
        if (err) throw err;
        res.send(doc);
    })
});

// Go to thong ke
router.get('/thongke', (req, res) => {
    Product.find({})
        .then(products => {
            res.render('ThongKe/home', { products: products })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});


module.exports = router;



module.exports= router