const { PaymentModel } = require("../models/payment.model");
const { UserModel } = require("../models/user.model");

module.exports.getAllPayments = async (req, res) => {
    try {
        const {
            username,
            paymentType,
            bankName,
            ifscCode,
            paytmNumber,
            upiId,
            paypalEmail,
            usdtAddress
        } = req.query;

        const paymentFilter = {};
        if (paymentType) paymentFilter.paymentType = paymentType;
        if (bankName) paymentFilter.bankName = { $regex: bankName, $options: "i" };
        if (ifscCode) paymentFilter.ifscCode = { $regex: ifscCode, $options: "i" };
        if (paytmNumber) paymentFilter.paytmNumber = { $regex: paytmNumber, $options: "i" };
        if (upiId) paymentFilter.upiId = { $regex: upiId, $options: "i" };
        if (paypalEmail) paymentFilter.paypalEmail = { $regex: paypalEmail, $options: "i" };
        if (usdtAddress) paymentFilter.usdtAddress = { $regex: usdtAddress, $options: "i" };


        if (username) {
            const users = await UserModel.find({
                username: { $regex: username, $options: "i" }
            }).select("_id");

            const userIds = users.map((u) => u._id);
            paymentFilter.user = { $in: userIds };
        }

        const payments = await PaymentModel.find(paymentFilter)
            .populate("user", "username email role")
            .sort({ _id: -1 });

        res.status(200).json({
            msg: "All payment methods",
            total: payments.length,
            payments
        });

    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};