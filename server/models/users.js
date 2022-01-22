const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:false
    },
    email:{
      type:String,
      required:false
    },
    password:{
      type:String,
      required:false
    },
    phone:{
      type:Number,
      required:false
    },
    role:{
      type:String,
      required:false
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