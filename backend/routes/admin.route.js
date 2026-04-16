const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const { roleCheck } = require("../middlewares/roleCheck");
const { getAllPayments } = require("../controllers/admin.controller");

const adminRouter = Router();

adminRouter.get("/payments", auth, roleCheck("admin"), getAllPayments);

module.exports = { adminRouter };