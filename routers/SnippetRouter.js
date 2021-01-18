const router = require('express').Router()
const Snippet = require('../models/SnippetModel')

/**
 * Router for Snippet
 */

 router.post("/",(req,res)=>{

    const {title, description, code} = req.body

    const newSnippet = new Snippet({
        title, description, code
    })

    newSnippet.save().then(data=>{
        res.send(data)
    }).catch(err=>{ res.status(500).json(err)})
 })
   .get("/",(req,res)=>{
      
    
      Snippet.find().then(data=>{ res.status(200).json(data)}).catch(err=> res.status(500).json(err))


   })

   .delete("/:id", async (req,res)=>{
         
    const snippetID = req.params.id
    
    if(!snippetID)
    res.status(500).json({msg: "Please provide ID"})

    const delt= await Snippet.findById(snippetID)
    if(!delt)
    res.status(500).json({msg: "Not exist"})
    delt.delete().then(()=> res.send("Delted")).catch(err=> res.status(500).json(err))

   })

   .put("/:id",async (req,res)=>{

      const snippetID = req.params.id
      const {title, description, code} = req.body

      if(!snippetID)
      res.status(500).json({msg: "please provide ID"})

      if(!description && !code)
      res.status(500).json({msg:"Please provide all details"})

      const updateItem = await Snippet.findById(snippetID)
      if(!updateItem)
       res.status(500).json({msg:"Not exist"})

       updateItem.title = title
       updateItem.description = description
       updateItem.code = code

       updateItem.save().then((data)=> res.send(data)).catch(err=> res.status(500).json(err))
   })


 module.exports= router