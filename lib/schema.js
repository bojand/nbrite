module.exports = {
  "definitions": {
    "events": {
      "links": [
        {
          "href": "/events/{id}",
          "method": "GET",
          "title": "info"
        },
        {
          "href": "/events/{event_id}/attendees",
          "method": "GET",
          "title": "list",
          "properties": {
            "status": {
              "type": "string"
            }
          }
        },
        {
          "href": "/events/{event_id}/attendees/{attendee_id}",
          "method": "GET",
          "title": "info"
        },
        {
          "href": "/events/{event_id}/orders",
          "method": "GET",
          "title": "list"
        },
        {
          "href": "/events/{event_id}/discounts",
          "method": "GET",
          "title": "list"
        },
        {
          "href": "/events/{event_id}/discounts",
          "method": "POST",
          "title": "create",
          "properties": {
            "code": {
              "type": "string"
            },
            "amount_off": {
              "type": "number"
            },
            "ticket_ids": {
              "type": "array"
            },
            "start_date": {
              "type": "string"
            },
            "end_date": {
              "type": "string"
            },
            "quantity_available": {
              "type": "number"
            }
          }
        },
        {
          "href": "/events/{event_id}/access_codes",
          "method": "GET",
          "title": "list"
        },
        {
          "href": "/events/{event_id}/access_codes",
          "method": "POST",
          "title": "create",
          "properties": {
            "code": {
              "type": "string"
            },
            "ticket_ids": {
              "type": "array"
            },
            "start_date": {
              "type": "string"
            },
            "end_date": {
              "type": "string"
            },
            "quantity_available": {
              "type": "number"
            }
          }
        },
        {
          "href": "/events/{event_id}/transfers",
          "method": "GET",
          "title": "list"
        },
        {
          "href": "/events/{event_id}/teams",
          "method": "GET",
          "title": "list"
        },
        {
          "href": "/events/{event_id}/teams/{team_id}",
          "method": "GET",
          "title": "info"
        },
        {
          "href": "/events/{event_id}/teams/{team_id}/attendees",
          "method": "GET",
          "title": "list"
        }
      ]
    },
    "users": {
      "links": [
        {
          "href": "/users/me",
          "method": "GET",
          "title": "info"
        },
        {
          "href": "/users/{user_id}",
          "method": "GET",
          "title": "info"
        },
        {
          "href": "/users/{user_id}/orders",
          "method": "GET",
          "title": "list"
        },
        {
          "href": "/users/{user_id}/owned_events",
          "method": "GET",
          "title": "list"
        },
        {
          "href": "/users/{user_id}/owned_event_orders",
          "method": "GET",
          "title": "list"
        },
        {
          "href": "/users/{user_id}/owned_event_attendees",
          "method": "GET",
          "title": "list"
        },
        {
          "href": "/users/{user_id}/venues",
          "method": "GET",
          "title": "list"
        },
        {
          "href": "/users/{user_id}/organizers",
          "method": "GET",
          "title": "list"
        }
      ]
    },
    "orders": {
      "links": [
        {
          "href": "/orders/{order_id}",
          "method": "GET",
          "title": "info"
        }
      ]
    }
  }
};