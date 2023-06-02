const functions = require("firebase-functions");
const express =require('express')
const cors =require('cors')
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY)


// App Config
const app =express()


// middleWares
app.use(cors({origin:true}))
app.use(express.json())


app.post('/payments/create' ,async (req ,res)=>{
    const total = req.query.total
   const paymentIntent =await stripe.paymentIntents.create({
        amount:total,
        currency:'usd',

    }) 

    //Ok - created
    res.status(201).send({
         clientSecret : paymentIntent.client_secret ,
    })

})
// API Routes
app.get('/' ,(req,res)=>res.status(200).send('Hello world'))


//  example endpoint 
// http://127.0.0.1:5001/registration-app-1ae8e/us-central1/api

// listen Command
exports.api =functions.https.onRequest(app)