# Travlr Getaways - Final Full Stack Project
Shaban Ghaith

Repository: https://github.com/gshaban/travlr

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

## Portfolio Reflection

### Architecture

In this full stack project, I used more than one kind of frontend development. The customer-facing side began as Express HTML and Handlebars templates. This approach renders pages on the server and sends complete HTML views to the browser. It was useful for the public Travlr Getaways website because pages such as Home, Travel, Rooms, Meals, News, About, and Contact followed a consistent template layout with shared header and footer partials. JavaScript also supported the project by allowing the application to handle routing, controller logic, data access, and dynamic page behavior through Node.js and Express.

The administrator side used a single-page application, or SPA, built with Angular. This was different from the Express pages because the Angular app runs in the browser, uses components for the interface, and communicates with the backend through API calls. The SPA made the admin experience feel more like an application because the user can log in, view trip cards, add trips, edit trips, and delete trips without moving through separate server-rendered pages for every action. The tradeoff is that the SPA requires more coordination between the frontend, API, database, routing, and security layers.

The backend used a NoSQL MongoDB database because the project data fits naturally as document-style records. Each trip has fields such as code, name, length, start date, resort, per-person cost, image, and description. MongoDB stores this kind of data flexibly as JSON-like documents, and Mongoose allowed the project to define a schema while still keeping the benefits of a document database. MongoDB also worked well with the JavaScript-based stack because data could move between the database, Express API, and Angular frontend in a format that closely matches the objects used in the code.

### Functionality

JSON is different from JavaScript because JSON is a data format, while JavaScript is a programming language. JavaScript can contain logic, functions, variables, classes, and control flow. JSON only represents structured data using key-value pairs, arrays, strings, numbers, booleans, and null values. In this project, JSON helped tie the frontend and backend together because the API returned trip data as JSON, and the Angular SPA consumed that data to display trip cards and populate forms. The same kind of structured data could also be sent back to the backend when an admin added or edited a trip.

Refactoring was an important part of improving the Travlr application. Early in the project, static HTML was converted into Express routes, controllers, and Handlebars templates so repeated page structure could be reused instead of copied across separate files. The trip listing also moved from static page content to dynamic data pulled from JSON and later from MongoDB through Mongoose and API endpoints. On the Angular side, the admin interface was refactored into reusable components such as trip listing, trip card, add trip, edit trip, login, and navbar components. This improved organization and made the code easier to maintain because each component had a focused responsibility.

Reusable UI components are valuable because they reduce duplicated code and help the application behave consistently. For example, a trip card component can display trip information in one standard format wherever trip data appears. If the design or displayed fields need to change later, the update can be made in one component instead of several separate pages. Reusable components also make larger applications easier to test, troubleshoot, and expand.

### Testing

In a full stack application, methods describe the type of request being made, and endpoints describe where that request is sent. For this project, `GET` requests retrieved trip data, `POST` requests added new data or submitted login and registration information, `PUT` requests updated existing trip records, and `DELETE` requests removed trip records. Endpoints such as `/api/trips`, `/api/trips/:tripCode`, `/api/register`, and `/api/login` defined the API paths that connected the frontend to backend functionality.

API testing was necessary because each endpoint needed to return the correct response for both successful and unsuccessful requests. I tested public routes such as `/`, `/travel`, and `/api/trips`, and I also tested protected admin routes for adding, updating, and deleting trips. Security added another layer to the testing process because protected endpoints should reject requests that do not include a valid token. After authentication was added, it was not enough to test only whether a route worked. I also had to test whether the route correctly returned `401` for missing or invalid tokens and allowed the request only when a valid JSON Web Token was provided.

This helped me understand that full stack testing has to cover more than the visible page. The frontend may load correctly, but an API call can fail because of an incorrect endpoint, a missing request body field, a database connection issue, or an authentication problem. Testing the public website, API responses, MongoDB data, login flow, protected routes, and Angular admin behavior together gave me a better understanding of how the full stack works as one connected system.

### Reflection

This course helped me move closer to my professional goals by giving me hands-on experience building a complete web application instead of only working on isolated pieces. Before this course, it was easier to think of frontend, backend, and database work as separate topics. By building Travlr Getaways across the full course, I learned how those pieces depend on each other in a real application. I practiced creating Express routes and controllers, converting static HTML into templates, using MongoDB and Mongoose for persistent data, building RESTful API endpoints, creating an Angular SPA, and adding secure login authentication with JWTs.

The most valuable skill I developed was understanding how data flows through a full stack application. A trip record can begin in MongoDB, move through a Mongoose model, be returned by an Express API endpoint as JSON, and then be displayed or edited in Angular. Seeing that complete path made the architecture much clearer to me. I also improved my ability to test my own work, especially by checking API endpoints, security behavior, route responses, and final ZIP submissions before turning them in.

These skills make me a more marketable candidate because modern software roles often require developers to understand more than one layer of an application. Even if I specialize later, I now have a stronger foundation in frontend development, backend development, databases, REST APIs, authentication, GitHub workflow, and project documentation. I can also speak about a completed full stack project in my portfolio, explain the technical decisions behind it, and show how I improved the application over multiple iterations.

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

I used ChatGPT to help review the assignment rubric, organize my reflection, revise the README, and prepare this portfolio submission. I reviewed and edited the final content before submission.
