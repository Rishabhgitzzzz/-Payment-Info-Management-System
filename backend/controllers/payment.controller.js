const { PaymentModel } = require("../models/payment.model");
const { z } = require("zod");

module.exports.addPayMethod = async (req, res) => {
    const id = req.userID;
    try {
        const PaymentSchema = z.object({
            paymentType: z.enum(["Bank", "Paytm", "UPI", "USDT", "PayPal"]),
            bankName: z.string().optional(),
            branchName: z.string().optional(),
            ifscCode: z.string().optional(),
            accountNumber: z.string().optional(),
            accountHolderName: z.string().optional(),

            paytmNumber: z.string().optional(),

            upiId: z.string().optional(),

            paypalEmail: z.string().email("Invalid PayPal email").optional(),

            usdtAddress: z.string().optional(),

        }).superRefine((data, ctx) => {
            if (data.paymentType === "Bank") {
                if (!data.bankName) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Bank Name is required",
                        path: ["bankName"],
                    });
                }
                if (!data.branchName) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Branch Name is required",
                        path: ["branchName"],
                    });
                }
                if (!data.ifscCode) {
                    ctx.addIssue({
                        code: "custom",
                        message: "IFSC Code is required",
                        path: ["ifscCode"],
                    });
                }
                if (!data.accountNumber) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Account Number is required",
                        path: ["accountNumber"],
                    });
                }
                if (!data.accountHolderName) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Account Holder Name is required",
                        path: ["accountHolderName"],
                    });
                }
            }

            if (data.paymentType === "Paytm") {
                if (!data.paytmNumber) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Paytm Number is required",
                        path: ["paytmNumber"],
                    });
                }
            }

            if (data.paymentType === "UPI") {
                if (!data.upiId) {
                    ctx.addIssue({
                        code: "custom",
                        message: "UPI ID is required",
                        path: ["upiId"],
                    });
                }
            }

            if (data.paymentType === "PayPal") {
                if (!data.paypalEmail) {
                    ctx.addIssue({
                        code: "custom",
                        message: "PayPal Email is required",
                        path: ["paypalEmail"],
                    });
                }
            }

            if (data.paymentType === "USDT") {
                if (!data.usdtAddress) {
                    ctx.addIssue({
                        code: "custom",
                        message: "USDT Address is required",
                        path: ["usdtAddress"],
                    });
                }
            }

        });

        const isValid = PaymentSchema.safeParse(req.body);

        if (!isValid.success) {
            return res.status(400).json({ errors: isValid.error.flatten().fieldErrors });
        }

        let correctData = {
            user: id,
            paymentType: isValid.data.paymentType
        };

        if (isValid.data.paymentType === "Bank") {
            correctData.bankName = isValid.data.bankName;
            correctData.branchName = isValid.data.branchName;
            correctData.ifscCode = isValid.data.ifscCode;
            correctData.accountNumber = isValid.data.accountNumber;
            correctData.accountHolderName = isValid.data.accountHolderName;
        }

        if (isValid.data.paymentType === "UPI") {
            correctData.upiId = isValid.data.upiId;
        }

        if (isValid.data.paymentType === "Paytm") {
            correctData.paytmNumber = isValid.data.paytmNumber;
        }

        if (isValid.data.paymentType === "GPay") {
            correctData.gpayNumber = isValid.data.gpayNumber;
        }

        if (isValid.data.paymentType === "PhonePe") {
            correctData.phonePeNumber = isValid.data.phonePeNumber;
        }

        if (isValid.data.paymentType === "PayPal") {
            correctData.paypalEmail = isValid.data.paypalEmail;
        }

        if (isValid.data.paymentType === "USDT") {
            correctData.usdtAddress = isValid.data.usdtAddress;
        }

        const payment = await PaymentModel.create(correctData);

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
        const { id } = req.params;

    } catch (error) {
        res.status(500).json(
            {
                msg: "Server error",
                error: error.message
            }
        );
    }
}