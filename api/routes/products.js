const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router.get(`/`, (req, res, next)=>{
    res.status(200).json({
        message:"handling GET request to /products"
    })
})

router.post(`/`, (req, res, next)=>{

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    })

    product
        .save()
        .then(result=>{
            console.log(result)
        })
        .catch(err=> console.log(err))

    res.status(201).json({
        message:"handling POST request to /products",
        createdProduct: product
    })
})

router.get(`/:productId`, (req, res, next)=>{
    const id = req.params.productId
    Product.findById(id).exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error:err})
    })
    
})

router.patch(`/:productId`, (req, res, next)=>{
    res.status(200).json({
        message:"Update product",
    })
    
})

router.delete(`/:productId`, (req, res, next)=>{
    const id = req.params.productId
    Product.remove({_id:id})
    .exec()
    .then(result =>{
        res.status(200).json()
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
})

module.exports =  router