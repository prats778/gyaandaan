const mongoose=require('mongoose');
const enrolledSchema = new mongoose.Schema({
    tutor:{
      type:String,
      required:true
    },
    subject:{
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
    },
    suitors:{
      type:[String],
      required:false
    } ,
    resources:{
      type:[String],
      required:false
    }       
});

const docobject=new mongoose.model("Enrolled",enrolledSchema);
module.exports=docobject;