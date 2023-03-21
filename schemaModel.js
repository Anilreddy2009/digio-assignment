const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const {isEmail}=require('validator');

const modelSchema=new mongoose.Schema({
    gmail:{
        type:String,
        require:[true,'please enter your email'],
        unique:[true,'gmail should be unique'],
        validate:[isEmail,'please enter a valid email']
    },
    name:{
        type:String,
        require:[true,'please enter your name']
    },
    reason:{
        type:String,
        require:[true,'please enter your reason for lone']
    },
    file_data:{
        type:String,
        require:[true,'please enter your details'],
        unique:[true,'please enter unique details']
    }
});

modelSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.file_data= await bcrypt.hash(this.file_data,salt);
    next();
});

const User=mongoose.model('users',modelSchema)
module.exports=User;