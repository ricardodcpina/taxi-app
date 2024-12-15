# WhichWayNow

WhichWayNow is a transportation service web application that integrates with Google to provide the user an optimal route between two addresses, as well as a list of available drivers and other ride specific details such as price and estimated duration.

---

## Table of Contents

- [Live Demo](#live-demo)
- [Technologies](#technologies)
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

**Node** - non blocking I/O, which allows the server to manage multiple simultaneous requests efficiently; Versatility with fullstack Javascript;

**Typescript** - Static typing provides type safety, better productivity with intellisense, compile-time error checking reducing bugs.

**Express.js** - Facilitates route creation, middlewares and HTTP request management; Faster API development.

**Prisma** - provides support for mutliple databases; Automated queries and migrations for better productivity; Typescript compatibility;

**PostgreSQL** - SQL for well-defined relation between entities; Robustness and support to complex transactions.

**Jest** - Code coverage reports; Watch mode allows continous testing;

**Vite** - HMR reduces wait times when making code changes; Optimized build performance; Built-in support for TS, JSX, CSS preprocessors.

**React** - Component-based architecture providing code maintainabilty and reusability; Faster and efficient rendering with virtual DOM;

**React Router** - Dynamic routing based on user input, URL parameters, etc; Improved organization with nested and hierarchical routes; Declarative routing makes app's navigation easier to understand and read.

**Styled-Components** - Scoped and modular styles prevents conflicts with global CSS; Dynamic styling bases on props or state of components;

**ESLint** - Enforce code consistency styles across the project; Allows customizable rules and error prevention;

---

## Architecture

- [Backend](#backend)
- [Frontend](#frontend)
- [Infrastructure](#infrastructure)

A service-oriented Model-View-Controller design was preferred aiming segregation of responsibilities, code reusability, maintenance, scalability and easier external API integrations.

### Backend

Backend layer runs on port 8080 and consists of a RestAPI built with Node.js, Typescript and Express.js. Its contents are the database models, controllers, services, routes, utility functions, customized errors, middlewares and some unit tests.

#### APIs

For complete details about the API, access its documentation at http://swagger.io/which-way-now.

External API's:

- **Google Route API** - calculates the optimized route, ETAs (estimated time of arrival) and distance between two given points, origin and destination.

- **Google Geocoding API** - converts the given addresses to latitude/longitude coordinates.

- **Google Maps Static API** - displays a static map with the calculated route and origin and destination markers.

#### Models

Prisma ORM provides a PostgreSQL database instance and two models: Ride Schema and Driver Schema.

Prisma Schemas:

- Ride Schema - stores relevant data about a selected ride by the user whem prompted for an option.
- Driver Schema - stores data from all available drivers.

Prisma directory contains migrations, both schemas and a seed file. The migration initializes the driver and ride tables in PostgreSQL, while the seed file provides three predefined drivers (just for demonstration) for the user to chose depending on the driver's minimum kilometers.

#### Controllers

All of the controllers features simple user input validation (that don't need to access the database) like checking for blank fields and checking for distinct addresses.

Errors found during service execution in controllers are redirected to the global error handling middleware.

Ride schema endpoints:

- POST /ride/estimate - estimateRideController
- PATCH /ride/confirm - confirmRideController
- GET /ride/{customer_id}?driver_id={driver_id} - listRidesController
- GET /ride/static_map - generateMapRideController

Driver schema endpoints:

- /driver/ - listDriversController

#### Routes

Two routers created for both ride controllers and drive controllers.

#### Services

Each service is called from the corresponding controller with the exception of generateRouteService and geoCodingService, which are called from inside of estimateRideService. Validations that need access to database are executed here.

Ride services:

- **estimateRideService** - calls geoCodingService and validate coordinates, calls genereateRouteService, fetch drivers from db according to route's calculated distance and order by ascending cost per km. Returns the ride data with a list of driver options.

- **confirmRideService** - validates if the option chosen by user has a valid driver and minimum kilometer according to database record. Save ride to database if validation is successfull and return true.

- **listRidesService** - if driver_id is provided as a  a query param, validates driver_id and fetches list of rides from that driver. If no driver_id is provided, fetches a list with all the customer's ride disregarding the driver. Validates if no rides were found and returns the list of rides.

- **geoCodingService** - transforms addresses to latitude and longitude coordinates. Returns the coordinates.

- **generateRouteService** - calculates optimized route according to provided addresses. Return the ride data.

- **generateMapRideService** - generate map with provided addresses and polylines from the generateRouteService. Returns the map image as a buffer.

Driver services:

- **listDriversService** - Returns the list of all drivers in database.

#### Middlewares

A global error handling middleware formats the customized errors with error_code and error_description. Otherwise it shows internal server error with 500 status code as default.

#### Errors

List of customized errors:

- 400 - INVALID_DATA
- 400 - INVALID_DRIVER
- 404 - DRIVER_NOT_FOUND
- 404 - NO_RIDES_FOUND
- 404 - INVALID_ADDRESS
- 406 - INVALID_DISTANCE
- 500 - EXTERNAL_API_ERROR

#### Utility functions

Validation functions for controllers. validateBlankFields runs whenever user provides a request body and validateAdresses normalizes origin and destination strings provided by user and check if they are the same.

#### Tests

Tests covers the following services and utility functions:

- estimateRide
- confirmRide
- listRides
- validateBlankFields
- validadeAddresses

### Frontend

Frontend layer runs on port 80 and was built with Vite, React and Typescript. Its contents are the public directory with images, UI components, react hooks, routes, pages, and utility functions.  

#### Routes

Frontend routes are located inside App.tsx file:

/ - Home Page (redirects to /request automatically)
/request - Request ride page
/options - Ride options page
/history - Ride history page
\* - Error page

#### Pages

Ride request page - This is the page the user gets redirected to when acessing home. There's the request form component so the user can provide a customer id number and the origin and destination addresses. 

Ride options page - Displays the static map based on user input sent from the earlier request form. The map shows the calculated route and origin and destination markers. All driver options are presented so the user can make his choice. It displays an error page in case the user access /options directly without providing data from request form.

Ride history page - The ride history form is displayed in this page. A table is shown based on the input the user provide: a customer id number and a driver filter option.

#### Hooks



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

Under construction 🔧 🏗️🏗️🏗️ ⚙️

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
