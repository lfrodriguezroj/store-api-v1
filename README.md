# Store API

This project is a RESTful API developed using Nest.js, a progressive Node.js framework. It provides endpoints for interacting with a store application, including user authentication, product management. PostgreSQL is used as the database for storing product, user, and order data.

## Technologies Used

- **Nest.js**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **PostgreSQL**: A powerful, open-source relational database management system.
- **JWT**: JSON Web Tokens are used for authentication and authorization.
- **Swagger**: API documentation is generated using Swagger UI.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/lfrodriguezroj/store-api-v1
    ```

2. Install dependencies:

    ```bash
    cd store-api-v1
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory following the format of `.env.example` file

4. Start the server:
    ```bash
    npm run start:dev
    ```
## API Documentation
Swagger UI is integrated into the API for easy documentation and testing. After starting the server, you can access the API documentation at `http://localhost:4000/api`.