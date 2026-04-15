const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const paymentSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "user"
    },
    paymentType: {
        type: String,
        enum: ['Bank', 'Paytm', 'UPI', 'USDT', 'PayPal'],
        required: true
    },

    bankName: String,
    branchName: String,
    ifscCode: String,
    accountNumber: String,
    accountHolderName: String,

    paytmNumber: {
        type: String
    },


    upiId: {
        type: String
    },

    paypalEmail: {
        type: String
    },


    usdtAddress: {
        type: String
    },
})

const PaymentModel = mongoose.model("payment", paymentSchema);

module.exports = { PaymentModel };