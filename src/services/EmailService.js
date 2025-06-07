// src/services/EmailService.js

const MockProvider1 = require("./MockProvider1");
const MockProvider2 = require("./MockProvider2");
const Logger = require("../utils/Logger");
const CircuitBreaker = require("../utils/CircuitBreaker");
const idempotencyStore = require("../data/idempotencyStore");
const statusStore = require("../data/statusStore");

const MAX_RETRIES = 3;
const RATE_LIMIT = 5;
let lastSent = [];

const provider1 = new MockProvider1();
const provider2 = new MockProvider2();

// For each provider, we set up a `CircuitBreaker`.
const circuitBreaker1 = new CircuitBreaker(provider1); 
const circuitBreaker2 = new CircuitBreaker(provider2);

async function sendEmail(to, subject, body, idempotencyKey) {
  // Check for duplicate using object property
  if (idempotencyStore[idempotencyKey]) {
    return { status: "duplicate", message: "Email already sent" };
  }
  // Rate limiting
  const now = Date.now();
  lastSent = lastSent.filter((ts) => now - ts < 60000);
  if (lastSent.length >= RATE_LIMIT) {
    throw new Error("Rate limit exceeded");
  }

  const attemptSend = async (provider, retryCount = 0) => {
    try {
      await provider.send(to, subject, body);
      // Mark idempotency key used as true
      idempotencyStore[idempotencyKey] = true;
      statusStore[idempotencyKey] = "success";
      lastSent.push(Date.now());
      Logger.log(`Sent via ${provider.name}`);
      return { status: "sent", provider: provider.name };
    } catch (err) {
      if (retryCount < MAX_RETRIES) {
        const delay = Math.pow(2, retryCount) * 100;
        await new Promise((res) => setTimeout(res, delay));
        return attemptSend(provider, retryCount + 1);
      } else {
        throw err;
      }
    }
  };

  try {
    return await circuitBreaker1.exec(() => attemptSend(provider1));
  } catch (_) {
    return await circuitBreaker2.exec(() => attemptSend(provider2));
  }
}

// Finally, we export our `sendEmail` function
module.exports = {
  sendEmail,
};
