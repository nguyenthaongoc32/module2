// routes/MomoPayRoute.js
import express from "express";
import { createPayment, handleMomoIPN } from "../controller/MomoPayController.js";

const Router = express.Router();

Router.post("/createPayment", createPayment);
Router.post("/ipn", handleMomoIPN);

export default Router;
