import express from "express";
import PaymentController from "./controllers/PaymentController";

const Router = express.Router();

Router.post("/api/payments/fulfill", PaymentController.fulfill);

export default Router;
