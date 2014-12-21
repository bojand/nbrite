var auth = require('./auth.json');
var fixture = require('./fixture.json');
var assert = require('assert');
var Nbrite = require('../lib/Nbrite');

var nbrite;

var ticketClassId;
var eventId;

module.exports = {
  before: function (fn) {
    nbrite = new Nbrite({token: auth.access_token});
    fn();
  },

  beforeEach: function (done) {
    setTimeout(done, 400);
  },

  //
  // Event functions
  //

  'event search': function (done) {
    var startDate = new Date(2015, 1, 1).toISOString();
    startDate = startDate.slice(0, startDate.lastIndexOf('.'));
    startDate = startDate.concat('Z');

    var query = {
      'start_date.range_start': startDate,
      'venue.city': 'Halifax'
    };

    nbrite.events().search(query, function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.events);
      assert.ok(body.events instanceof Array);
      done();
    });
  },

  'create cost ticket class': function (done) {
    var params = {
      'ticket_class.name': 'Sample ticket class',
      'ticket_class.description': 'Sample ticket class description.',
      'ticket_class.quantity_total': 100,
      'ticket_class.currency': 'USD',
      'ticket_class.cost_fee:': 1000,
      'ticket_class.donation': false,
      'ticket_class.free': false,
      'ticket_class.include_fee': false,
      'ticket_class.split_fee': false,
      'ticket_class.hide_description': false,
      'ticket_class.minimum_quantity': 1,
      'ticket_class.maximum_quantity': 4
    };

    nbrite.events(fixture.existing_event_id).ticketClasses().create(params, function (err, body) {
      console.dir(err);
      assert.ifError(err);
      assert.ok(body);
      console.dir(body);
      done();
    });
  },

  'create free ticket class': function (done) {
    var params = {
      'ticket_class.name': 'Sample free ticket class',
      'ticket_class.description': 'Sample free ticket class description.',
      'ticket_class.quantity_total': 100,
      'ticket_class.donation': false,
      'ticket_class.free': true,
      'ticket_class.include_fee': false,
      'ticket_class.split_fee': false,
      'ticket_class.hide_description': false,
      'ticket_class.minimum_quantity': 1,
      'ticket_class.maximum_quantity': 4
    };

    nbrite.events(fixture.existing_event_id).ticketClasses().create(params, function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      ticketClassId = body.id;
      done();
    });
  },

  'get ticket type details': function (done) {
    nbrite.events(fixture.existing_event_id).ticketClasses(ticketClassId).info(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  'update ticket type details': function (done) {
    var params = {
      'ticket_class.name': 'Free ticket',
      'ticket_class.description': 'Free ticket class description 2.',
      'ticket_class.quantity_total': 200,
      'ticket_class.donation': false,
      'ticket_class.free': true,
      'ticket_class.include_fee': false,
      'ticket_class.split_fee': false,
      'ticket_class.hide_description': false,
      'ticket_class.minimum_quantity': 1,
      'ticket_class.maximum_quantity': 2
    };
    nbrite.events(fixture.existing_event_id).ticketClasses(ticketClassId).update(params, function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  'delete ticket type details': function (done) {
    nbrite.events(fixture.existing_event_id).ticketClasses(ticketClassId).delete(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.deleted);
      done();
    });
  },

  'get categories': function (done) {
    nbrite.categories().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.categories);
      done();
    });
  },

  'get category details': function (done) {
    nbrite.categories(fixture.category_id).info(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  'get subcategories': function (done) {
    nbrite.subcategories().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.subcategories);
      done();
    });
  },

  'get subcategories details': function (done) {
    nbrite.subcategories(fixture.subcategory_id).info(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  'get formats': function (done) {
    nbrite.formats().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.formats);
      done();
    });
  },

  'get format details': function (done) {
    nbrite.formats(fixture.format_id).info(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  'get event details': function (done) {
    nbrite.events(fixture.existing_event_id).info(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  // TODO rest of /events endpont test here.

  'get event attendees invalid status': function (done) {
    nbrite.events(fixture.existing_event_id).attendees().list({status: 123}, function (err, body) {
      assert.ok(err);
      assert(/Invalid parameter type./.test(err.message));
      done();
    });
  },

  'get event attendees with status': function (done) {
    nbrite.events(fixture.existing_event_id).attendees().list({status: 'attending'}, function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.attendees);
      done();
    });
  },

  'get event attendees without status': function (done) {
    nbrite.events(fixture.existing_event_id).attendees().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.attendees);
      done();
    });
  },

  'get event attendees details': function (done) {
    nbrite.events(fixture.existing_event_id).attendees(fixture.existing_attendee_id).info(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  'get event orders': function (done) {
    nbrite.events(fixture.existing_event_id).orders().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.orders);
      done();
    });
  },

  'get event discounts': function (done) {
    nbrite.events(fixture.existing_event_id).discounts().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.discounts);
      done();
    });
  },

  // TODO test for discount create

  'get event access codes': function (done) {
    nbrite.events(fixture.existing_event_id).accessCodes().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.access_codes);
      done();
    });
  },

  'get event transfers': function (done) {
    nbrite.events(fixture.existing_event_id).transfers().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.transfers);
      done();
    });
  },

  'get event teams': function (done) {
    nbrite.events(fixture.existing_event_id_teams).teams().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.teams);
      done();
    });
  },

  'get event team details': function (done) {
    nbrite.events(fixture.existing_event_id_teams).teams(fixture.existing_team_id).info(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  'get event team attendees': function (done) {
    nbrite.events(fixture.existing_event_id_teams).teams(fixture.existing_team_id).attendees().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.attendees);
      done();
    });
  },

  //
  // User functions
  //

  'get user details': function (done) {
    nbrite.users(fixture.existing_user_id).info(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  'get user me()': function (done) {
    nbrite.users().me().info(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  'get user orders': function (done) {
    nbrite.users(fixture.existing_user_id).orders().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.orders);
      done();
    });
  },

  'get user owned events': function (done) {
    nbrite.users(fixture.existing_user_id).ownedEvents().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.events);
      done();
    });
  },

  'get user owned event\'s orders': function (done) {
    nbrite.users(fixture.existing_user_id).ownedEventOrders().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.orders);
      done();
    });
  },

  'get user owned event\'s attendees': function (done) {
    nbrite.users(fixture.existing_user_id).ownedEventAttendees().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.attendees);
      done();
    });
  },

  'get user venues': function (done) {
    nbrite.users(fixture.existing_user_id).venues().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.venues);
      done();
    });
  },

  'get user organizers': function (done) {
    nbrite.users(fixture.existing_user_id).organizers().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.organizers);
      done();
    });
  },

  //
  // Order functions
  //

  'get order details': function (done) {
    nbrite.orders(fixture.existing_order_id).info(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      done();
    });
  },

  //
  // Contact Lists
  //

  'get user\'s contact lists': function (done) {
    nbrite.users(fixture.existing_user_id).contactLists().list(function (err, body) {
      assert.ifError(err);
      assert.ok(body);
      assert.ok(body.contact_lists);
      done();
    });
  }
};