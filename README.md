# Teleport Backends-for-Frontends (BFF) Demo

This project demonstrates Teleport's Backends-for-Frontends (BFF) support feature using a microservices architecture with multiple backend services.

## Components

- Frontend: React application
- Main API: Flask application
- Analytics API: Flask application
- Database: PostgreSQL
- Teleport: Access management

## Architecture

The demo consists of a frontend application that communicates with two backend API services:

1. Main API: Provides general data and interacts with the database.
2. Analytics API: Provides mock analytics data.

Teleport is used to manage access to all services, demonstrating the BFF support feature by automatically authenticating the frontend with both backend services.

## Setup

1. Ensure you have Docker and Docker Compose installed.
2. Clone this repository.
3.  Set your Teleport configuration run `make configure`
4. Start. Run `make start`
5. Access the Teleport web UI at `https://localhost:3080`.
6. Configure Teleport users and roles as needed.
7. Use Teleport to access the frontend application.

## Project Structure

```
teleport-bff-demo/
├── docker-compose.yaml   # Defines all services
├── teleport.yaml         # Teleport configuration
├── init.sql              # Database initialization script
├── frontend/             # React application
├── api/                  # Main Flask API service
├── analytics_api/        # Analytics Flask API service
└── README.md
```

## Services

- Frontend (port 3000): React application that displays data from both APIs.
- Main API (port 5000): Provides general data and interacts with the database.
- Analytics API (port 5001): Provides mock analytics data.
- Database (port 5432): PostgreSQL database used by the main API.
- Teleport (port 3080): Manages access to all services.

## Usage

1. Start the services using Docker Compose.
2. Access the Teleport web UI and configure access as needed.
3. Use Teleport to access the frontend application.
4. The frontend will automatically authenticate with both API services through Teleport.
5. Observe how Teleport manages authentication across different services.

## Teleport Configuration

The `teleport.yaml` file configures Teleport to manage access to the frontend and both API services. The frontend application is configured with `required_apps` set to both the main API and analytics API, demonstrating the BFF support feature.

## Extending the Demo

You can extend this demo by:

1. Adding more backend services.
2. Implementing real authentication in the APIs.
3. Adding more complex database interactions.
4. Implementing real analytics data collection and processing.

## Troubleshooting

If you encounter any issues:

1. Ensure all required ports are free on your machine.
2. Check Docker logs for any service-specific errors.
3. Verify that all services are running with `docker-compose ps`.
4. Ensure Teleport is properly configured and running.

For more information on Teleport and its features, visit the [official Teleport documentation](https://goteleport.com/docs/).