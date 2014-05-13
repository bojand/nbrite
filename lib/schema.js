module.exports = {
  "definitions": {
    "events": {
      "description": "Manage Events.",
      "links": [
        {
          "description": "Get details of a specific event within an Eventbrite account.",
          "href": "/events/{event_id}",
          "method": "GET",
          "title": "info"
        },
        {
          "description": "Get list of attendees for an event.",
          "href": "/events/{event_id}/attendees",
          "method": "GET",
          "title": "list",
          "properties": {
            "status": {
              "type": "string"
            },
            "changed_since": {
              "type": "string"
            }
          }
        },
        {
          "description": "Get information on a specific attendee.",
          "href": "/events/{event_id}/attendees/{attendee_id}",
          "method": "GET",
          "title": "info"
        },
        {
          "description": "Get a list orders for an event.",
          "href": "/events/{event_id}/orders",
          "method": "GET",
          "title": "list",
          "properties": {
            "status": {
              "type": "string"
            },
            "changed_since": {
              "type": "string"
            }
          }
        },
        {
          "description": "Get a list discounts for an event.",
          "href": "/events/{event_id}/discounts",
          "method": "GET",
          "title": "list"
        },
        {
          "description": "Create a discount for an event.",
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
          "description": "Get a list of access codes for an event.",
          "href": "/events/{event_id}/access_codes",
          "method": "GET",
          "title": "list"
        },
        {
          "description": "Create an access codes for an event.",
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
          "description": "Get a list of transfers for an event.",
          "href": "/events/{event_id}/transfers",
          "method": "GET",
          "title": "list"
        },
        {
          "description": "Get a list of teams for an event.",
          "href": "/events/{event_id}/teams",
          "method": "GET",
          "title": "list"
        },
        {
          "description": "Get individual team details for an event.",
          "href": "/events/{event_id}/teams/{team_id}",
          "method": "GET",
          "title": "info"
        },
        {
          "description": "Get attendee information for a specific team.",
          "href": "/events/{event_id}/teams/{team_id}/attendees",
          "method": "GET",
          "title": "list"
        }
      ]
    },
    "users": {
      "description": "Manage users.",
      "links": [
        {
          "description": "Retrieve detailed information about a specific user.",
          "href": "/users/me",
          "method": "GET",
          "title": "info"
        },
        {
          "description": "Retrieve detailed information about a specific user.",
          "href": "/users/{user_id}",
          "method": "GET",
          "title": "info"
        },
        {
          "description": "Retrieve Orders that are have been created on behalf of a specific user.",
          "href": "/users/{user_id}/orders",
          "method": "GET",
          "title": "list"
        },
        {
          "description": "Retrieve Events that are owned by a specific user.",
          "href": "/users/{user_id}/owned_events",
          "method": "GET",
          "title": "list"
        },
        {
          "description": "Retrieve orders that are owned by an event associated with a specific user.",
          "href": "/users/{user_id}/owned_event_orders",
          "method": "GET",
          "title": "list"
        },
        {
          "description": "Retrieve attendees that are owned by an event associated with a specific user.",
          "href": "/users/{user_id}/owned_event_attendees",
          "method": "GET",
          "title": "list"
        },
        {
          "description": "Retrieve venues that are have been created or admin-accessible by a specific user.",
          "href": "/users/{user_id}/venues",
          "method": "GET",
          "title": "list"
        },
        {
          "description": "Retrieve Organizers that are have been created or admin-accessible by a specific user.",
          "href": "/users/{user_id}/organizers",
          "method": "GET",
          "title": "list"
        }
      ]
    },
    "orders": {
      "description": "Manage Orders.",
      "links": [
        {
          "description": "Get order details.",
          "href": "/orders/{order_id}",
          "method": "GET",
          "title": "info"
        }
      ]
    },
    "contact_lists": {
      "description": "Manage Orders.",
      "links": [
        {
          "description": "Get retrieve Contact Lists that are have been created by a specific user.",
          "href": "/users/{user_id}/contact_lists/",
          "method": "GET",
          "title": "info"
        },
        {
          "description": "Create a contact list.",
          "href": "/users/{user_id}/contact_lists/",
          "method": "POST",
          "title": "create",
          "properties": {
            "code": {
              "name": "string"
            }
          }
        },
        {
          "description": "Retrieve detailed information about a specific contact list.",
          "href": "/users/{user_id}/contact_lists/(contact_list_id}",
          "method": "GET",
          "title": "info"
        },
        {
          "description": "Update a specific contact list.",
          "href": "/users/{user_id}/contact_lists/(contact_list_id}",
          "method": "POST",
          "title": "update",
          "properties": {
            "code": {
              "name": "string"
            }
          }
        }
      ]
    }
  }
};