import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    id : {type: mongoose.Schema.Types.ObjectId},
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    phone :{
        type: String,
        required: true,
        match: /^(\+84|0)([0-9]{9})$/  
      }
}, {timestamps: true})

const AuthModel = mongoose.model("auth", authSchema)


export default AuthModel