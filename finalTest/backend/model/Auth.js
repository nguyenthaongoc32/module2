import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    phone :{
        type: String,
        required: true,
        match: /^(\+84|0)([0-9]{9})$/  
      },
      role: { type: String, enum: ["user", "admin"], default: "user" },
}, {timestamps: true})

const AuthModel = mongoose.model("auth", authSchema)


export default AuthModel