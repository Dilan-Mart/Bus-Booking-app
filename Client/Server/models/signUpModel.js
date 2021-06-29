const mongoose=require('mongoose');

const signUpTemplate=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    mobile:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true},
    dob:{type:String,required:true},
    date:{type:Date,default:Date.now}
});

userData=mongoose.model('user',signUpTemplate);
module.exports=userData;