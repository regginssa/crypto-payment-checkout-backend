const { ethers } = require("ethers");

const ERC20_ABI = [
  "event Transfer(address indexed from,address indexed to,uint256 value)",
];

const ethProvider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);

async function verifyETH(txHash, expected) {
  const receipt = await ethProvider.getTransactionReceipt(txHash);

  if (!receipt) return { success: false, reason: "tx not found" };

  if (receipt.status !== 1) return { success: false, reason: "tx failed" };

  const tx = await ethProvider.getTransaction(txHash);

  if (!tx) return { success: false, reason: "tx missing" };

  if (tx.to.toLowerCase() !== expected.to.toLowerCase())
    return { success: false, reason: "wrong receiver" };

  const paidAmount = ethers.formatEther(tx.value);

  if (Number(paidAmount) < Number(expected.amount))
    return { success: false, reason: "underpaid" };

  return { success: true };
}

async function verifyERC20(txHash, expected) {
  const receipt = await ethProvider.getTransactionReceipt(txHash);

  if (!receipt || receipt.status !== 1) return { success: false };

  const iface = new ethers.Interface(ERC20_ABI);

  for (const log of receipt.logs) {
    try {
      const parsed = iface.parseLog(log);

      if (parsed.name === "Transfer") {
        const { from, to, value } = parsed.args;

        if (to.toLowerCase() === expected.to.toLowerCase()) {
          const paid = Number(ethers.formatUnits(value, expected.decimals));

          if (paid >= Number(expected.amount)) {
            return { success: true };
          }
        }
      }
    } catch (e) {}
  }

  return { success: false };
}

module.exports = { verifyETH, verifyERC20 };
