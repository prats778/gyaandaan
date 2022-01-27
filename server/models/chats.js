const mongoose=require('mongoose');
const ChatsSchema = new mongoose.Schema({
    sender:{
      type:String,
      required:true
    },
    receiver:{
      type:String,
      required:false
    },
    msg:{
      type:String,
      required:true
    }
});

const docobject=new mongoose.model("Chats",ChatsSchema);
module.exports=docobject;