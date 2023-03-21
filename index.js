const express=require('express');
const mongoose=require('mongoose');
const Cors=require('cors');
const routes=require('./routes/routes');
const app=express();

const url="dummyUrl";
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
const con=mongoose.connection;
con.on('open',()=>{
    console.log('connected...');
});
app.use(express.json());
app.use(express.Cors());
app.use(routes);