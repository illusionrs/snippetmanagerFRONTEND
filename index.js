const express = require('express')
const mongoose = require('mongoose')


require('dotenv').config()
/**
 * Connect to Mongo
 */
mongoose.connect(process.env.MONGO_URI,
{ useNewUrlParser: true,
    useUnifiedTopology: true
 },(err)=>{
     if(err) return console.error(err)

     console.log("Connect to snippetdb")
 })



const app = express()

app.use(express.json())

app.use("/snippet",require('./routers/SnippetRouter'))

app.get("/test",(req,res)=>{

    res.send("Thi is test")

})

app.listen(5000,()=> console.log("working on 5000"))