const {Router}=require('express');
const mongoose=require('mongoose');
const User=require('../schemaModel');

const handleErrors=(err)=>{
    console.log(err.message,err.data); //here we use err.data for unique fields
}

Router.post('/v2/client/document/uploadpdf',async(req,res)=>{
    const {gmail,name,reason,file_data}=req.body;
    
    try{
        const user=await User.create({gmail,name,reason,file_data});
        res.status(201).json(user);
    }catch(err){
        handleErrors(err);
    }
});

Router.get('/v2/client/document/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(user){
            res.json(user);
        }else{
            console.log('user not found');
        }
    }catch(err){
        handleErrors(err);
    }
})

Router.get('/v2/client/document/download',async(req,res)=>{
    const id=req.query.document_id;
    try{
        const user=await User.findById(id);
        const filePath=path.join(__dirname,'../${user}');
        res.download(user);
    }catch(err){
        handleErrors(err);
    }
})