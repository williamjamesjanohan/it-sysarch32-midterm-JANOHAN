const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParder = require('body-parser')
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

mongoose.connect('mongodb+srv://williamjamesjanohan1997:qq8Np9fayEPnLK2Y@cluster0.7nzasbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
app.use(morgan('dev'))
app.use(bodyParder.urlencoded({extended:false}))
app.use(bodyParder.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req, res, next)=>{
    const error = new Error('Not found')
    error.status(404)
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})
module.exports = app;