const { Connection, PublicKey } = require("@solana/web3.js");

const solConnection = new Connection(process.env.SOL_RPC_URL, "confirmed");

async function verifySOL(signature, expected) {
  const tx = await solConnection.getParsedTransaction(signature, {
    commitment: "confirmed",
  });

  if (!tx) return { success: false };

  const instructions = tx.transaction.message.instructions;

  for (const ix of instructions) {
    if (ix.program === "system") {
      const info = ix.parsed.info;

      if (info.destination === expected.to) {
        const solAmount = info.lamports / 1e9;

        if (solAmount >= Number(expected.amount)) {
          return { success: true };
        }
      }
    }
  }

  return { success: false };
}

async function verifySPL(signature, expected) {
  const tx = await solConnection.getParsedTransaction(signature, {
    commitment: "confirmed",
  });

  if (!tx) return { success: false };

  const instructions = tx.transaction.message.instructions;

  for (const ix of instructions) {
    if (ix.program === "spl-token") {
      const info = ix.parsed.info;

      if (info.destinationOwner === expected.to) {
        const amount = Number(info.amount) / Math.pow(10, expected.decimals);

        if (amount >= Number(expected.amount)) {
          return { success: true };
        }
      }
    }
  }

  return { success: false };
}

module.exports = { verifySOL, verifySPL };
