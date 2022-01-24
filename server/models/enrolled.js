const mongoose=require('mongoose');
const enrolledSchema = new mongoose.Schema({
    tableindex:{
      type:String,
      required:true      
    },
    tutor:{
      type:String,
      required:false
    },
    subject:{
      type:String,
      required:false
    },
    studentsEnrolled:{
      type:String,
      required:false
    },
    timings:{
      type:String,
      required:false
    },
    target:{
      type:[String],
      required:false
    },
    link:{
      type:String,
      required:false  
    },
    resources:{
      type:[String],
      required:false
    }       
});

const docobject=new mongoose.model("Enrolled",enrolledSchema);
module.exports=docobject;