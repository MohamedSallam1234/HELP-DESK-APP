const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    code: {
        type: String,
        maxLength: 6,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    expiryDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("OTP", OtpSchema);
