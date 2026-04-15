const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const { roleCheck } = require("../middlewares/roleCheck");
const { addPayMethod, getUserPayMethods, editPayMethod } = require("../controllers/payment.controller");

const paymentRouter = Router();


paymentRouter.post("/", auth, roleCheck("user", "admin"), addPayMethod);

paymentRouter.get("/", auth, roleCheck("user", "admin"), getUserPayMethods);

paymentRouter.put("/:id", auth, roleCheck("user", "admin"), editPayMethod);

module.exports = { paymentRouter };