const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const { roleCheck } = require("../middlewares/roleCheck");
const { addPayMethod, getUserPayMethods, editPayMethod, delPayMethod } = require("../controllers/payment.controller");

const paymentRouter = Router();

paymentRouter.post("/", auth, roleCheck("user", "admin"), addPayMethod);

paymentRouter.get("/", auth, roleCheck("user", "admin"), getUserPayMethods);

paymentRouter.put("/:id", auth, roleCheck("user", "admin"), editPayMethod);

paymentRouter.delete("/:id", auth, roleCheck("user", "admin"), delPayMethod);


module.exports = { paymentRouter };