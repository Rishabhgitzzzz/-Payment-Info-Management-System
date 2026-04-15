const { z } = require("zod");

const BankSchema = z.object({
    paymentType: z.literal("Bank"),
    bankName: z.string().min(1, "Bank name required"),
    branchName: z.string().min(1, "Branch name required"),
    ifscCode: z.string().min(1, "IFSC required"),
    accountNumber: z.string().min(1, "Account number required"),
    accountHolderName: z.string().min(1, "Holder name required"),
});

const PaytmSchema = z.object({
    paymentType: z.literal("Paytm"),
    paytmNumber: z.string().min(10).max(10),
});

const UPISchema = z.object({
    paymentType: z.literal("UPI"),
    upiId: z.string().min(3),
});

const PayPalSchema = z.object({
    paymentType: z.literal("PayPal"),
    paypalEmail: z.string().email(),
});

const USDTSchema = z.object({
    paymentType: z.literal("USDT"),
    usdtAddress: z.string().min(10),
});


const PaymentSchema = z.discriminatedUnion("paymentType", [
    BankSchema,
    PaytmSchema,
    UPISchema,
    PayPalSchema,
    USDTSchema
]);

module.exports = { PaymentSchema };