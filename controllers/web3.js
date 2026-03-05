const Tx = require("../models/Tx");
const { verifyETH, verifyERC20 } = require("../utils/eth");
const { verifySOL, verifySPL } = require("../utils/sol");

const verify = async (req, res) => {
  try {
    const { txHash, txId } = req.params;

    const tx = await Tx.findById(txId);
    if (!tx) {
      return res
        .status(404)
        .json({ ok: false, message: "Transaction not found" });
    }

    const currency = tx.currency;

    let result = { success: false, message: "" };
    switch (currency) {
      case "eth":
        result = await verifyETH(txHash, tx);
        break;
      case "usdt-eth" | "usdc-eth":
        result = await verifyERC20(txHash, tx);
        break;
      case "sol":
        result = await verifySOL(txHash, tx);
        break;
      case "usdt-sol" | "usdc-sol" | "chrle" | "babyu":
        result = await verifySPL(txHash, tx);
        break;

      default:
        break;
    }

    if (!result.success) {
      return res
        .status(401)
        .json({ ok: false, message: "Payment confirmation failed" });
    }

    tx.status = "confirmed";
    await tx.save();

    res.json({ ok: true, data: tx });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

module.exports = { verify };
