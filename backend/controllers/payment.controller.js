const { PaymentModel } = require("../models/payment.model");
const { z } = require("zod");
const { PaymentSchema } = require("../validators/payment.validator");
const { is } = require("zod/v4/locales");

module.exports.addPayMethod = async (req, res) => {
    const id = req.userID;
    try {

        const isValid = PaymentSchema.safeParse(req.body);

        if (!isValid.success) {
            return res.status(400).json({ errors: isValid.error.flatten().fieldErrors });
        }

        const payment = await PaymentModel.create({
            user: id,
            ...isValid.data
        });

        res.status(200).json({
            msg: "Payment method added successfully",
            data: payment,
        })

    } catch (error) {
        res.status(500).json(
            {
                msg: "Server error",
                error: error.message
            }
        );
    }

}


module.exports.getUserPayMethods = async (req, res) => {
    try {
        const id = req.userID;

        const paymentMethods = await PaymentModel.find({ user: id });

        if (paymentMethods.length === 0) {

            return res.status(404).json({
                msg: "no payment method found"
            })
        }

        res.status(200).json({
            msg: "All payment method of logged in user",
            paymentMethods
        })

    } catch (error) {
        res.status(500).json(
            {
                msg: "Server error",
                error: error.message
            }
        );
    }
}

module.exports.editPayMethod = async (req, res) => {
    try {

        const isValid = PaymentSchema.safeParse(req.body);

        if (!isValid.success) {
            return res.status(400).json({ errors: isValid.error.flatten().fieldErrors });
        }

        const { id } = req.params;
        const userId = req.userID

        const updatedPayMethod = await PaymentModel.findOneAndUpdate(
            { _id: id, user: userId },
            { $set: isValid.data },
            { new: true, runValidators: true }
        );

        if (!updatedPayMethod) {
            return res.status(404).json({ msg: "Payment Method not found" });
        }
        res.status(200).json({
            msg: "Edited ",
            updatedPayMethod
        })
    } catch (error) {
        res.status(500).json(
            {
                msg: "Server error",
                error: error.message
            }
        );
    }
}