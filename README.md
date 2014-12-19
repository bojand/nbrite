# nbrite

Simple Node.js helper module for [Eventbrite API V3](http://developer.eventbrite.com/docs/).

Please see the [Eventbrite API documentation](http://developer.eventbrite.com/docs/) for full reference.

## Installation

`npm install nbrite`

## Usage overview

This module works by providing proxy objects for interacting with  different resources through the Eventbrite API.
Most methods take a `data` parameter, which is a Javascript object that would contain the arguments for the Eventbrite API.
All methods take a final parameter callback with two parameters: `error`, and `body`.
We try to parse the `body` into a javascript object, and return it to the callback as such for easier use and inspection by the client.
If there was an error a new `Error` object will be passed to the callback in the `error` parameter.
If the error originated from the (Eventbrite) server, the response code will be available in the `status_code` property
of the `error` object passed in the callback.

For full usage examples see the `/test` folder.

Basic usage to get event info:

```
var Nbrite = require('nbrite');
var nbrite = new Nbrite(EVENTBRITE_ACCESS_TOKEN);

nbrite.events('123456').info(function (err, event) {
  // `event` is parsed JSON response from the API
  console.dir(event);
});
```

Something more elaborate. Get event info, attendees, and attendee details. Notice that the proxy objects can be reused.

```
var event = nbrite.events('123456');

event.info(function (err, data) {
  // `data` is event info
  console.log(data);
});

event.attendees().list(function (err, attendees) {
  // `attendees` is the list of attendees
  console.log(attendees);
});

event.attendees('87654321').info(function (err, data) {
  // `data` is the attendee details
  console.log(data);
});
```

For full usage examples see the `/test` folder.

## Generic Requests
`nbrite` provides `get`, `post`, `put`, `patch` and `delete` functions which can make requests with the specified HTTP method to any endpoint:

```
nbrite.get('/orders', function (err, orders) {
});

nbrite.get('/events/123456/attendees', { status: 'not_attending' }, function (err, attendees) {
});
```

## Promises

Module works with Node-style callbacks, but also implements promises with the [Q](http://github.com/kriskowal/q) library.

```
nbrite.users('44499922255').info().then(function (data) {
  console.log(data);
}, function (err) {
  console.log(err);
});
```

The function passed as 2nd argument is optional and not needed if you don't care about the fail case.

## Debug logging

This library uses [debug](https://www.npmjs.com/package/debug) for debug logging. You can turn it on by adding
`nbrite` to `DEBUG` environment variable when you run your Node application/script. Example:

```
DEBUG=nbrite node myapp
```

## Tests

To run the test suite you must first create a file named `/test/auth.json`, which contains your credentials as JSON, for example:

```json
{ "access_token": "ABCD123ABCD123ABCD123A" }
```

Also create `/test/fixture.json` with some of your existing data:

```json
{
  "existing_event_id": "1234567890",
  "existing_event_id_teams": "2233445566",
  "existing_user_id": "44499922255",
  "existing_attendee_id": "222999555",
  "existing_team_id": "123456",
  "existing_order_id": "113331166"
}
```

`existing_event_id_teams` should be an event with a group or team registrations.

Then install the dev dependencies and execute the test suite:

```
$ npm install
$ npm test
```

The tests will call Eventbrite API.

## TODO
* Promise tests.

## Notes

This library started out as just an experiment.
It was heavily influenced by [node-heroku-client](https://github.com/jclem/node-heroku-client).