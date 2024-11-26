# 5 Days in the Clouds Task

A REST API for a video game matchmaking platform that calculates the rating (ELO) and additional statistics for each player participating in a match based on the provided data.

## Contents

- [Environment Description](#environment-description)
- [Running the Application](#running-the-application)
- [How to Build](#how-to-build)
- [List of Used Technologies](#list-of-used-technologies)

## Environment Description

You need to have Node.js (version 16 or later) installed on your system.

## How to Build

Since TypeScript is not used for this project, no build process is required.

## Running the Application

Paste this command into your terminal:

```bash
git clone https://github.com/JovanMihic99/5-dana-u-oblacima-zadatak
cd 5-dana-u-oblacima-zadatak
npm install
npm start
```

The application uses port 8080 by default, but you can change this via the `.env` file, which contains the `PORT` field.

## List of Used Technologies
- **[node.js](https://nodejs.org/)**: A JavaScript-based platform for developing server-side applications.

- **[express](https://expressjs.com/)**: A web framework for Node.js that enables quick and easy server and API creation.

- **[express-async-handler](https://www.npmjs.com/package/express-async-handler)**: Middleware for handling asynchronous functions in Express applications, simplifying error management.

- **[sqlite3](https://www.npmjs.com/package/sqlite3)**: A module for working with SQLite databases, ideal for lightweight, embedded database integration in Node.js applications.

- **[uuid](https://www.npmjs.com/package/uuid)**: A tool for generating unique identifiers (UUIDs).

- **[jest](https://www.npmjs.com/package/jest)**: A framework for testing JavaScript applications.
