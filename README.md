# Asset Tagging

This repository contains the codebase for the Asset Tagging project. Follow the instructions below to set up the development environment.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (version 6.x or later)
- [Git](https://git-scm.com/)

## Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/abhirambsn/asset-tagging.git
    cd asset-tagging
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

## Modules

The project is organized into the following modules:

- **Auth:** Handles user authentication, including login, registration, and password management.
- **Tenant:** Handles tenant, workspace, tenant IAM and asset management.
- **Insights:** Provides Insights and metrics on tenants.

## Running the Application

To start the development server, run:
```sh
cd modules/<modulename> && npm start
```

## Running Tests

To run tests, use:
```sh
cd modules/<modulename> && npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors and maintainers.
