const Tx = require("../models/Tx");

async function getOne(req, res) {
  try {
    const { id } = req.params;
    const tx = await Tx.findById(id);
    res.json({ ok: true, data: tx });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
}

async function create(req, res) {
  try {
    const tx = await Tx.create(req.body);
    res.json({ ok: true, data: tx });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const tx = await Tx.findById(id);
    if (!tx)
      return res
        .status(404)
        .json({ ok: false, message: "Transaction not found" });
    tx.set(req.body);
    await tx.save();
    res.json({ ok: true, data: tx });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    await Tx.findByIdAndDelete(id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
}

module.exports = { getOne, create, update, remove };
