# WhichWayNow

---

## Table of Contents

- [Live Demo](#live-demo)
- [Technologies](#technologies)
- [Description](#description)
- [Architecture](#architecture)
- [Pre-requisites](#pre-requisites)
- [Running](#running)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Live Demo

Access the app at Railway.app at https://which-way-now-production.up.railway.app/!

---

## Technologies

![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![PostgresSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)

---

## Description

WhichWayNow is a transportation service web application that integrates with Google to provide the user an optimal route between two addresses, as well as a list of available drivers and other ride specific details such as price and estimated duration.

---

## Architecture

- [Backend](#backend)
- [Frontend](#frontend)
- [Infrastructure](#infrastructure)

A service-oriented Model-View-Controller pattern was preferred aiming segregation of responsibilities, code reusability, maintenance, scalability and easier external API integrations.

### Backend

Port: 8080

RESTful API built with Node, Typescript and Express.js: 

- **Node** - non blocking I/O, which allows the server to manage multiple simultaneous requests efficiently; Versatility with fullstack Javascript;

- **Typescript** - Static typing provides type safety, better productivity with intellisense, compile-time error checking reducing bugs.

- **Express.js** - Facilitates route creation, middlewares and HTTP request management; Faster API development.

- API Endpoints at http://swagger.io/which-way-now

PostgreSQL Database provided by Prisma ORM:

- **Prisma** - provides support for mutliple databases; Automated queries and migrations for better productivity; Typescript compatibility;

- **PostgreSQL** - Well-defined relation between entities; Robustness and support to complex transactions. 

Unit testing with Jest assuring code runs correctly:

- **Jest** - Code coverage reports; Watch mode allows continous testing;


External API's:

- **Google Route API** - calculates the optimized route, ETAs (estimated time of arrival) and distance between two given points, origin and destination.

- **Google Geocoding API** - converts the given addresses to latitude/longitude coordinates.

- **Google Maps Static API** - displays a static map with the calculated route and origin and destination markers.

Middleware for global error handling.

### Frontend

Port: 80

### Infrastructure

The docker-compose file in root directory runs three main services:

- PostgresSQL official database image on port 5432
- Backend service from Dockerfile inside backend folder on port 8080
- Frontend service from Dockerfile inside frontend folder on port 80

Environment variables:

- GOOGLE_API_KEY - Access to Google API's
- DATABASE_URL - Database connection
- VITE_BACKEND_DOMAIN - Vite's proxy configuration to backend service

---

### Features

Optimized Route Calculation

Access to Ride History

---

## Pre-requisites

You can run the application locally with either Docker or Node.js

##### Docker

##### Node

---

## Running

---

## Testing

---

## Roadmap

---

## Contributing

---

## License
