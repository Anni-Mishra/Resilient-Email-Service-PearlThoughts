# Resilient Email Service

A fault-tolerant email sending microservice built with **JavaScript**, demonstrating core backend engineering principles such as retry logic, provider fallback, rate limiting, idempotency, and circuit breaking.

---

## 🛠 Features

- ✅ Retry mechanism with exponential backoff  
- ✅ Fallback between multiple mock providers  
- ✅ Idempotency (prevents duplicate sends)  
- ✅ Rate limiting (max 5 emails/minute)  
- ✅ Circuit Breaker pattern for fault tolerance  
- ✅ Status tracking of email send attempts  
- ✅ Lightweight mock queue system  
- ✅ Simple logging  
- ✅ RESTful API endpoint to send emails  
- ✅ Unit testing using Jest and Supertest

---

## 📁 Project Structure

resilient-email-service/
├── src/
│ ├── data/ # In-memory data stores
│ │ ├── idempotencyStore.js
│ │ └── statusStore.js
│ ├── routes/ # Express routes
│ │ └── emailRoutes.js
│ ├── services/ # Business logic
│ │ ├── EmailService.js
│ │ ├── MockProvider1.js
│ │ └── MockProvider2.js
│ ├── utils/ # Utilities
│ │ ├── CircuitBreaker.js
│ │ ├── Logger.js
│ │ └── queue.js
│ ├── app.js # Express app setup
│ └── server.js # App entry point
├── tests/
│ └── emailServices.test.js # Unit tests
├── package.json
├── package-lock.json
└── README.md

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/resilient-email-service.git
cd resilient-email-service

### 2. Install dependencies
npm install

### 3. Run the server
npm start
The server runs at: http://localhost:3000

## 📬 API Endpoint
POST /email/send
Request Body:
{
  "to": "recipient@example.com",
  "subject": "Hello",
  "body": "This is a test email.",
  "idempotencyKey": "unique-email-id-123"
}

Response:
{
  "status": "sent",
  "provider": "MockProvider1"
}

## 🧪 Run Tests
npm test
Runs unit tests using jest and supertest.
