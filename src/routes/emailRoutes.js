const express = require("express");
const router = express.Router();
const EmailService = require("../services/EmailService");

router.post("/send", async (req, res) => {
  const { to, subject, body, idempotencyKey } = req.body;
  try {
    const result = await EmailService.sendEmail(
      to,
      subject,
      body,
      idempotencyKey
    );
    res.status(200).json(result);
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;
