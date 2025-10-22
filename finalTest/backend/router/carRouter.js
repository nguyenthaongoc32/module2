import express from "express"; 

import { getCar , getCarId } from "../controller/carController.js";
import authToken from "../middleware/checkAuthToken.js";

const Router = express.Router();

Router.route("/getCar").get(getCar);
Router.route("/getCar/:id").get(getCarId);

export default Router;