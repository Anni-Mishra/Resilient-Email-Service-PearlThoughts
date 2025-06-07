const request = require('supertest');
const app = require('../src/app'); 
const EmailService = require('../src/services/EmailService');


describe("Email Service", () => {
  test("should send email successfully", async () => {
    const res = await request(app).post("/email/send").send({
      to: "user@example.com",
      subject: "Hello",
      body: "Testing the email",
      idempotencyKey: "key123",
    });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("sent");
  });

  test("should prevent duplicate sends with idempotency", async () => {
    await request(app).post("/email/send").send({
      to: "user@example.com",
      subject: "Hello",
      body: "Testing the email",
      idempotencyKey: "key345",
    });

    const res = await request(app).post("/email/send").send({
      to: "user@example.com",
      subject: "Hello Again",
      body: "Testing it again",
      idempotencyKey: "key345",
    });

    expect(res.body.status).toBe("duplicate");
  });
});
