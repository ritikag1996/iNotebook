const express=require('express');
const router=express.Router();
const Notes=require('../models/Notes.js')
const { body, validationResult } = require('express-validator');
const fetchUser=require('../middleware/fetchUser.js')

//Route 1: fetch all notes by using user id: Post "api/notes/fetchallnotes" . login required
router.get('/fetchallnotes',fetchUser, async(req,res)=>{
try{
let notes=await Notes.find({user:req.user.id})
res.send(notes)
}
catch(error){
    console.error(error.message)
    res.status(400).send("Internal server error")
}

})
//Route 2: Add Note: Post "api/notes/addnote" . login required
router.post('/addnote',fetchUser,
[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Enter a valid description').isLength({ min: 5 })], async(req,res)=>{
        const errors = validationResult(req);
        const{title,description,tag}=req.body
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try{
    //    let notes=Notes.create({
    //     title:req.body.title,
    //     description:req.body.description,
    //     tag:req.body.tag,
    //     user:req.user.id
    //    })
    //    res.send(notes)

                    //   OR

        let notes= new Notes({
            title,description,tag,user:req.user.id
        })
        let savedNote= await notes.save()
        res.send(savedNote)
        
        }
        catch(error){
            console.error(error.message)
            res.status(500).send("Internal server error")
           
        }
})

//Route 3: Update an existing note: Put "api/notes/updatenote" . login required
router.put('/updatenote/:id',fetchUser,async(req,res)=>{
try{
// create new Note
 let newNote={};
 if(req.body.title){newNote.title=req.body.title};
 if(req.body.description){newNote.description=req.body.description};
 if(req.body.tag){newNote.tag=req.body.tag};
// check if note exit
let note=await Notes.findById(req.params.id)
if(!note)
{
    return res.status(401).send("Not found")
}
// check if correct user is updating
if(note.user.toString() !== req.user.id){
    return res.status(404).send("Not Authorized")
}
note=await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
res.json({note})
}
catch(error){
    console.error(error.message)
    res.status(500).send("Internal server error")
   
}
})


 //Route 4: Delete note: Put "api/notes/updatenote" . login required
 router.delete('/deletenote/:id',fetchUser,async(req,res)=>{

    try{
  
    // check if note exit
    let note=await Notes.findById(req.params.id)
    if(!note)
    {
        return res.status(401).send("Not found")
    }
    // check if correct user is updating
    if(note.user.toString() !== req.user.id){
       
        return res.status(404).send("Not Authorized")
     
    }
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note deleted Successfuly",note:note})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
       
    }
    })
module.exports=router