# Express Demo with Sequelize

This project demonstrates a basic Express application with Sequelize, including sign-up, sign-in functionality, and user profile management.

## Backend Setup Guide

Follow these steps to set up and start the backend server:

### 1. Configure Environment File
- Create environment-specific `.env` files. You can refer to the `env.example` file.
    - For development:
        - Create a `.env.development` file.
    - For production:
        - Create a `.env.production` file.
- Add the necessary environment variables in `src/config/config.json` to run the migration.

### 2. Install Dependencies

- Install project dependencies:
    ```sh
    pnpm install
    ```

### 3. Run the Migration

- To run the migration use:
    ```sh
    pnpm run migrate:up
    ```
- To undo the migration use:
    ```sh 
    pnpm run migrate:down
    ```

### 4. Start the Server

- Start the development server:
    ```sh
    pnpm run dev
    ```
