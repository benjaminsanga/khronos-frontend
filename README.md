# Khronos - Interface

The interface for users to interact with Khronos. A product that provides a secure and reliable digital wallet designed to help communities overcome financial and infrastructural challenges.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Project Structure](#project-structure)
5. [Available Scripts](#available-scripts)
6. [Configuration](#configuration)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

---

## Features
- Registration of account.
- User authentication and authorization.
- Project/wallet creation.
- Responsive design.
- Project search.
- Payment to project.

## Installation

### Prerequisites
- Node.js >= 21.7.2
- npm >= 8.3.1

### Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/benjaminsanga/khronos-frontend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd khronos-frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

### Starting the Development Server
```bash
npm start
```

### Running the build
```bash
npm run build
```

## Project Structure
```bash
src/
 ├── assets/         # Images, fonts, and other static assets
 ├── components/     # Reusable components
 ├── context/        # State management
 ├── form-schema/    # Required fields
 ├── hooks/          # Custom React hooks
 ├── pages/          # Page-level components
 ├── services/       # API calls and external services
 ├── utils/          # Helper functions and utilities
 ├── App.js          # Main App component
 ├── index.js        # Entry point for React
 ```

## Available Scripts
```bash
npm start
Starts the development server.
```

```bash
npm run build
Builds the app for production.
```

```bash
npm run test
Runs tests with the configured testing framework.
```

## Configuration

DANGEROUSLY_DISABLE_HOST_CHECK=true

## Testing

### Unit Tests
Running tests with Jest - Coming up.

### End-to-End Tests
Description of any end-to-end tests, if applicable.

## Deployment

Repository `main` branch from Github hosted on Vercel.

## Contributing

Submit an issue.
Make pull requests.

## Author
> Benjamin Sanga https://github.com/benjaminsanga

## License
MIT License.

