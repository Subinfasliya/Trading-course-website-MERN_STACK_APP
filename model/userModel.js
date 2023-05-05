const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is Required']

        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        mobile:{
            type:Number,
            required:[true,'Mobile number is Required']
        },
        
        password: {
            type: String,
            required: [true, 'Password is required']
        },
       answer:{
        type:String,
        required:true
       },
        course: {
            type: String,
            required: true,

        },
        role:{
            type:Number,
            default:0
        },
        status:{
            type:String,
            default:'UnActive'
        }
    }, { timestamps: true })
const userModel = mongoose.model('users', userSchema)
module.exports = userModel;