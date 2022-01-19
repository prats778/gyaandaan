const mongoose=require('mongoose');
const enrolledSchema = new mongoose.Schema({
    tutor:{
      type:String,
      required:true
    },
    subjects:{
      type:String,
      required:false
    },
    studentsEnrolled:{
      type:[String],
      required:false
    },
    timings:{
      type:[String],
      required:false
    }    
});

const docobject=new mongoose.model("Enrolled",enrolledSchema);
module.exports=docobject;