# Travlr Getaways - Module Four NoSQL Databases, Models, and Schemas

Student: Shaban Ghaith

This Module Four submission adds MongoDB/Mongoose support to the Travlr Getaways Express application. It follows the Full Stack Guide structure by adding the Mongoose database access module, trip schema/model, seed data, and seed script under the expected project folders.

## Run

The submitted ZIP includes `node_modules`, so the grader can run the project with only:

```bash
npm start
```

Then open:

```text
http://localhost:3000/
http://localhost:3000/travel
http://localhost:3000/api/trips
```

## Database and API Files

- `app_server/models/db.js`: Connects to MongoDB using Mongoose and includes connection error handling.
- `app_server/models/travlr.js`: Defines the trip schema and validation rules exactly for the Trips collection.
- `app_server/models/seed.js`: Populates MongoDB from `data/trips.json` using Mongoose.
- `data/trips.json`: Contains the required seed trip data.
- `app_api/controllers/trips.js`: Retrieves trip data in JSON format for `/api/trips`.
- `app_api/routes/index.js`: Exposes the `/api/trips` endpoint.

## Database Population

The app connects to `mongodb://127.0.0.1:27017/travlr` by default. If the Trips collection is empty when `npm start` runs, the database module seeds the collection from `data/trips.json`. The seed script can also be run manually with:

```bash
npm run seed
```

## AI Use Acknowledgment

I used ChatGPT to help implement, review, and test the Module Four database, schema, API, and seed-data updates. I reviewed the final files and tested the application before submission.