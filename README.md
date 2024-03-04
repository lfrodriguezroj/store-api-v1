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

## AWS Deploy

1. Build Your Docker Image: Build your Docker image locally using the existing Dockerfile in the repository.
    ```bash
    docker build -t store-api .
    ```
2. Push Your Docker Image to AWS ECR: Push your Docker image to the AWS Elastic Container Registry (ECR) to make it available for deployment.
    ```bash
    aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-ecr-url
    docker tag your-image-name:latest your-ecr-url/your-image-name:latest
    docker push your-ecr-url/your-image-name:latest

    ```
3. **Create a Task Definition:** Define a task definition for your application in AWS ECS. Specify your Docker image, container port, environment variables, and other settings.

4. **Create a Cluster:** Create an ECS cluster where your Fargate tasks will run.

5. **Create a Service:** Create an ECS service to manage your Fargate tasks. **Configure the service to use Fargate as the launch type, specify the task definition, and set other options such as desired count, network configuration, etc.

6. **Deploy Your Service:** Deploy your ECS service to start running your Nest.js API on AWS Fargate.

7. **Update Security Groups:** Update the security groups associated with your ECS service to allow inbound traffic on port 3000 (or your API's port) from your desired sources.

8. **Access Your API:** Once your service is running, you can access your Nest.js API using the public IP or DNS name of the Fargate task.