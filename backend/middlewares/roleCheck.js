const { UserModel } = require("../models/user.model");


const roleCheck = (...roles) => {
    return async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.userID).select("role");

            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ msg: "Access denied" });
            }
            next();
        } catch (err) {
            res.status(500).json({ msg: "Server error", error: err.message });
        }

    }

}

module.exports = { roleCheck }