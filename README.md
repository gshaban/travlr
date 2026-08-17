# Travlr Getaways - Module Seven Security
Shaban Ghaith

This Module Seven submission adds authentication and secure administrative API access to the Travlr Getaways full stack application. The project follows the Module Seven Full Stack Guide structure by adding the user schema, Passport local strategy, registration and login endpoints, JWT handling, Angular login form, token storage, and a JWT interceptor.

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

## Run the Angular Admin SPA

Open a second PowerShell window. From the `app_admin` folder, run:

```bash
npm start
```

This runs Angular's `ng serve` command and opens the admin SPA at:

```text
http://localhost:4200/
```

## Security Features Added

- `app_api/models/user.js` stores user name, email, salt, and password hash.
- `app_api/config/passport.js` configures Passport local authentication.
- `app_api/controllers/authentication.js` provides `/api/register` and `/api/login`.
- `app_api/routes/index.js` protects POST, PUT, and DELETE trip endpoints with JWT middleware.
- `app_admin/src/app/login` adds the admin login form.
- `app_admin/src/app/services/authentication.service.ts` stores and checks the JWT.
- `app_admin/src/app/utils/jwt.interceptor.ts` attaches the bearer token to protected API calls.
- The Angular admin hides Add, Edit, and Delete controls until the user is logged in.

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
