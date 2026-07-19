# Travlr Getaways - Module Three Static HTML to Templates with JSON

Student: Shaban Ghaith

I continued the Travlr public website using the Express MVC structure. The
travel page reads trip records from `data/trips.json` in the controller and
uses a Handlebars `{{#each trips}}` loop to render each trip card dynamically.
The project uses routes, controllers, views, and reusable HBS header and footer
partials.

## Run

The `node_modules` folder is included with this submission. Run only:

```bash
npm start
```

Then open:

```text
http://localhost:3000/
http://localhost:3000/travel
```

## AI Use Acknowledgment

I used ChatGPT to help organize, build, and test this Module Three assignment.
I reviewed the final application and checked that the travel page renders its
trip data from JSON before submission.