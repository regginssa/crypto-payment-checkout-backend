const mongoose = require("mongoose");
const { Schema } = mongoose;

const TxSchema = new Schema(
  {
    amount: { type: String, required: true },
    currency: { type: String, required: true },
    from: { type: String }, // from address
    to: { type: String }, // receipt address
    txHash: { type: String },
    status: {
      type: String,
      enum: [
        "pending",
        "detected",
        "confirming",
        "confirmed",
        "expired",
        "failed",
      ],
    },
    webhookUrl: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    metadata: { type: Object },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Tx", TxSchema);
