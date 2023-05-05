const mongoose = require ('mongoose')
const videoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    video:{
        data:Buffer,
        contentType: String,
        

    },
  
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const videoModel = mongoose.model('videos', videoSchema)
module.exports = videoModel;