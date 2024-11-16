const mongoose = require("mongoose");

const schemaOptions = {
  strict: true,
  timestamps: true,
};
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      requied: true,
    },
  },
 schemaOptions
);

module.exports = mongoose.model("sessionSchema", sessionSchema);
