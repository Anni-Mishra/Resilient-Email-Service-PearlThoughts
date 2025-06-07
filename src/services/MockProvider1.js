class MockProvider1 {
  constructor() {
    this.name = "MockProvider1";
  }

  async send(to, subject, body) {
    if (Math.random() < 0.3) throw new Error("MockProvider1 failed");
    return true;
  }
}

module.exports = MockProvider1;
