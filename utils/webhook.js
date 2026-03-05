const triggerWebhook = async (tx) => {
  try {
    fetch(tx.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tx),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Webhook delivered:", data);
      })
      .catch((err) => {
        console.error("Webhook failed:", err.message);
      });
  } catch (err) {
    console.error("Webhook error:", err.message);
  }
};

module.exports = { triggerWebhook };
