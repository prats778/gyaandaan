const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    phone:{
      type:Number,
      required:true
    },
    role:{
      type:String,
      required:true
    },
    interests:{
      type:[String],
      required:false
    },
    experience:{
      type:Number,
      required:false
    }
});

const docobject=new mongoose.model("Users",userSchema);
module.exports=docobject;