const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const passportLocalMongoose=require("passport-local-mongoose");

const UserSchema=new Schema({
    email:{
        type:String,
        required:true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',UserSchema);

// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose'); // Correct import

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
// });

// // Use passport-local-mongoose plugin to add authentication methods like `authenticate()`
// userSchema.plugin(passportLocalMongoose);

// const User = mongoose.model('User', userSchema);

// module.exports = User;
