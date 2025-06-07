class MockProvider2 {
  constructor() {
    this.name = "MockProvider2";
  }

  async send(to, subject, body) {
    if (Math.random() < 0.2) throw new Error("MockProvider2 failed");
    return true;
  }
}

module.exports = MockProvider2;
