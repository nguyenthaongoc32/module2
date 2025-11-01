import express from "express"
import upload from "../middleware/multer.js"
import uploadImage from "../controller/imageController.js"

const Router = express.Router()

Router.route("/uploadimage").post(upload.array("images",10), uploadImage) 

export default Router