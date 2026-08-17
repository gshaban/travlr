# Travlr Getaways - Final Full Stack Project
Shaban Ghaith

This final project submission includes the completed Travlr Getaways full stack application. The project uses the MEAN stack: MongoDB for persistent trip and user data, Express and Node.js for the public website and REST API, and Angular for the administrator single-page application.

The public customer-facing website uses Express MVC routing, controllers, Handlebars templates, shared partials, and MongoDB-backed trip data. The administrator SPA uses Angular components, services, models, routes, JWT storage, and a JWT interceptor so an admin can log in and manage trip packages through secure endpoints.

## Run the Express Backend

From the root `travlr` folder, run:

```bash
npm start
```

The submitted project includes the dependencies needed for the grader to run the backend with `npm start`. The backend runs at:

```text
http://localhost:3000/
http://localhost:3000/travel
http://localhost:3000/api/trips
```

The `prestart` script runs the seed script before startup. If `travlr.trips` already contains records, the seed script skips inserting duplicates.

The seed script also creates a mock admin login if it does not already exist:

```text
Email: shaban.ghaith@snhu.edu
Password: shaban@123
```

## Run the Angular Admin SPA

Open a second PowerShell window. From the `app_admin` folder, run:

```bash
npm start
```

This runs Angular's `ng serve` command and opens the admin SPA at:

```text
http://localhost:4200/
```

## Final Project Features

- Public Express website with MVC routes, controllers, views, and assets.
- Handlebars templates render MongoDB trip data dynamically.
- Public navigation routes include Home, Travel, Rooms, Meals, News, About, and Contact using the Travlr template layout.
- Mongoose models and schemas store trip and user records in MongoDB.
- REST API supports list, detail, add, update, and delete trip operations.
- Angular administrator SPA supports viewing, adding, editing, and deleting trips.
- Login authentication uses Passport, hashed passwords, JWTs, and secure admin endpoints.
- Angular hides Add, Edit, and Delete controls until the user logs in.

## Postman/API Test Targets

Register a mock admin user:

```text
POST http://localhost:3000/api/register
```

Login with the registered user:

```text
POST http://localhost:3000/api/login
```

Protected endpoints require:

```text
Authorization: Bearer <token>
```

Protected admin endpoints:

```text
POST http://localhost:3000/api/trips
PUT http://localhost:3000/api/trips/:tripCode
DELETE http://localhost:3000/api/trips/:tripCode
```

## AI Use Acknowledgment

I used ChatGPT to help review the rubric, implement security, and test the project. I reviewed and tested the final files before submission.
