# Awesome Quadratic Voting Survey Webpage

Running the code will start the program on `localhost:3000`, which will direct you to the page that displays the surveys.

## Dependencies

You will need to have `npm` installed to download the javascript dependencies.

Additionally, you need a `CouchDB` service running in order to store the data. Be sure you have enough permissions to create databases and documents.

## Running

Go to the top directory and run `npm start` (with `sudo` if necessary)

## Structure

As usual for an `ExpressJS` application, code for the routing is in `routes` and the `pug` generating the HTML is in `views`. There is additional code in `utils` for database interaction and conversion from json to cvs.
