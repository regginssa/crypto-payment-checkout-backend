const getAll = async (req, res) => {
  try {
    const eth = process.env.DEPOSIT_ETH_WALLET_ADDRESS;
    const sol = process.env.DEPOSIT_SOL_WALLET_ADDRESS;

    res.json({ ok: true, data: { eth, sol } });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

module.exports = { getAll };
