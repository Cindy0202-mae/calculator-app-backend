# Calculator App Backend

This is the backend for the Calculator App, built with **Node.js**, **Express**, and **Prisma**. It provides APIs for performing basic arithmetic operations, storing calculation history, and retrieving or deleting history.

---

## Features

- Perform basic arithmetic operations: addition, subtraction, multiplication, and division.
- Validate input to ensure proper operations and operands.
- Store calculation history in a database.
- Retrieve and delete calculation history.
- Health check endpoint for monitoring server status.

---

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (for database)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/calculator-app-backend.git
   cd calculator-app-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a **.env** file in the root directory and add the following:
     ```bash
     DATABASE_URL=postgresql://user:password@localhost:5432/calculator_db
     ```
   - Replace **user**, **password**, and **calculator_db** with your PostgreSQL credentials.

4. Run Prisma migrations to set up the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

---

## Running the Server

### Development Mode
Start the server in development mode:
```bash
npm run dev
```

The server will be available at:

- [http://localhost:3001](http://localhost:3001)
- `http://<your-computer-ip>:3001` (for physical devices)

### Finding Your Computer's IP Address
To find your computer's IP address, run the following command in your terminal:

```bash
ifconfig | grep inet
```

Look for the IP address associated with your Wi-Fi or Ethernet connection (e.g., `192.168.0.13`).

---

## Testing the API

You can test the API using tools like `curl` or Postman.

### Health Check
- **GET** `/health`
  ```bash
  curl http://localhost:3001/health
  ```
  Expected Response:
  ```json
  {
    "status": "healthy"
  }
  ```

### Perform a Calculation
- **POST** `/api/calculator/calculate`
  ```bash
  curl -X POST http://localhost:3001/api/calculator/calculate \
    -H "Content-Type: application/json" \
    -d '{"operation": "+", "operand1": 5, "operand2": 3}'
  ```
  Expected Response:
  ```json
  {
    "success": true,
    "result": 8,
    "calculation": {
      "id": 1,
      "operation": "+",
      "operand1": "5",
      "operand2": "3",
      "result": "8"
    }
  }
  ```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
