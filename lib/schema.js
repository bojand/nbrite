module.exports = {
  "$schema": "http://interagent.github.io/interagent-hyper-schema",
  "definitions": {
    "events": {
      "description": "Search, create, update and manage Eventbrite Events.",
      "$schema": "http://json-schema.org/draft-04/hyper-schema",
      "type": "object",
      "links": [
        {
          "description": "This endpoint allows you to retrieve Events from across Eventbrite’s directory, regardless of which user owns the event — and of course, this endpoint will only return Events that are ‘public’.",
          "href": "/events/search",
          "method": "GET",
          "title": "search",
          "rel": "parent-action",
          "schema": {
            "properties": {
              "q": {
                "description": "Pass in a value for ‘q’ that is a query and will return events matching the given keyword(s).",
                "type": "string"
              },
              "since_id": {
                "description": "Pass in the last ‘Event ID’ to only return events that have been created after this Event ID.",
                "type": "string"
              },
              "sort_by": {
                "description": "Sort the list of events by “id”, “date”, “name”, “city”. The default is “date”.",
                "type": "string"
              },
              "popular": {
                "description": "Pass in ‘true’ to only receive a subset of events that have already sold a minimum threshold of tickets and received a minimum amount of social engagement.",
                "type": "boolean"
              },
              "location.address": {
                "description": "The address of the location that you want to search around.",
                "type": "string"
              },
              "location.latitude": {
                "description": "The latitude of the location that you want to search around.",
                "type": "string"
              },
              "location.longitude": {
                "description": "The longitude of the location that you want to search around.",
                "type": "string"
              },
              "location.within": {
                "description": "The distance that you want to search around the given location. This should be an integer followed by “mi” or “km”.",
                "type": "string"
              },
              "venue.city": {
                "description": "Only return events that are located in the given city.",
                "type": "string"
              },
              "venue.region": {
                "description": "Only return events that are located in the given region.",
                "type": "string"
              },
              "venue.country": {
                "description": "Only return events that are located in the given country.",
                "type": "string"
              },
              "organizer.id": {
                "description": "Only return events that are organized by a specific Organizer.",
                "type": "string"
              },
              "user.id": {
                "description": "Only return events that are organized by a specific User.",
                "type": "string"
              },
              "tracking_code": {
                "description": "Append the given tracking_code to the event URLs that are returned.",
                "type": "string"
              },
              "categories": {
                "description": "Only return events that are in a specific category — must pass in the category ID, not the name. To pass in multiple categories, list with a comma separator.",
                "type": "string"
              },
              "formats": {
                "description": "Only return events that are in a specific format. To pass in multiple formats, list with a comma separator.",
                "type": "string"
              },
              "start_date.range_start": {
                "description": "Only return events with start dates after the given UTC date.",
                "type": "string",
                "format": "date-time"
              },
              "start_date.range_end": {
                "description": "Only return events with start dates before the given UTC date.",
                "type": "string",
                "format": "date-time"
              },
              "start_date.keyword": {
                "description": "Only return events with start dates within the given keyword date range. Valid options are “today”, “tomorrow”, “this_week”, “this_weekend”, “next_week”, and “this_month”.",
                "type": "string"
              },
              "date_created.range_start": {
                "description": "Only return events with date created after the given UTC date.",
                "type": "string",
                "format": "date-time"
              },
              "date_created.range_end": {
                "description": "Only return events with date created before the given UTC date.",
                "type": "string",
                "format": "date-time"
              },
              "date_created.keyword": {
                "description": "Only return events with date created within the given keyword date range. Valid options are “today”, “tomorrow”, “this_week”, “this_weekend”, “next_week”, and “this_month”.",
                "type": "string"
              },
              "date_modified.range_start": {
                "description": "Only return events with date_modified after the given UTC date.",
                "type": "string",
                "format": "date-time"
              },
              "date_modified.range_end": {
                "description": "Only return events with date_modified before the given UTC date.",
                "type": "string",
                "format": "date-time"
              },
              "date_modified.keyword": {
                "description": "Only return events with date_modified within the given keyword date range. Valid options are “today”, “tomorrow”, “this_week”, “this_weekend”, “next_week”, and “this_month”.",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Get ticket types for a specific event.",
          "href": "/events/{event_id}/ticket_classes",
          "method": "GET",
          "title": "list",
          "rel": "self"
        },
        {
          "description": "Retrieve ticket type details on a specific event.",
          "href": "/events/{event_id}/ticket_classes/{ticket_class_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Delete ticket type on a specific event.",
          "href": "/events/{event_id}/ticket_classes/{ticket_class_id}",
          "method": "DELETE",
          "title": "delete",
          "rel": "destroy"
        },
        {
          "description": "Create a ticket type on a specific event.",
          "href": "/events/{event_id}/ticket_classes",
          "method": "POST",
          "title": "create",
          "rel": "create",
          "schema": {
            "properties": {
              "ticket_class.description": {
                "description": "Description of the ticket class",
                "type": "string"
              },
              "ticket_class.quantity_total": {
                "description": "Total available number of this ticket class",
                "type": "number"
              },
              "ticket_class.cost.currency": {
                "description": "Currency of the ticket (must match event currency)",
                "type": "string"
              },
              "ticket_class.cost.value": {
                "description": "Ticket cost (in integer minor units of currency)",
                "type": "number"
              },
              "ticket_class.donation": {
                "description": "Is this a donation (user-determined cost)",
                "type": "boolean"
              },
              "ticket_class.free": {
                "description": "Is this a free ticket?",
                "type": "boolean"
              },
              "ticket_class.include_fee": {
                "description": "Absorb the fee into the displayed cost",
                "type": "boolean"
              },
              "ticket_class.split_fee": {
                "description": "Absorb the payment fee, but show the Eventbrite fee",
                "type": "boolean"
              },
              "ticket_class.hide_description": {
                "description": "Hide the ticket description on the event page",
                "type": "boolean"
              },
              "ticket_class.sales_start": {
                "description": "When the ticket is available for sale (leave empty for ‘when event is published’)",
                "type": "string",
                "format": "date-time"
              },
              "ticket_class.sales_start_after": {
                "description": "The ID of another ticket class – when it sells out, this class will go on sale",
                "type": "string"
              },
              "ticket_class.minimum_quantity": {
                "description": "Minimum number per order",
                "type": "number"
              },
              "ticket_class.maximum_quantity": {
                "description": "Maximum number per order",
                "type": "number"
              },
              "ticket_class.auto_hide": {
                "description": "Hide this ticket when it’s not on sale",
                "type": "boolean"
              },
              "ticket_class.auto_hide_before": {
                "description": "Override reveal date for auto-hide",
                "type": "boolean"
              },
              "ticket_class.auth_hide_after": {
                "description": "Override re-hide date for auto-hide",
                "type": "boolean"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Update a ticket type on a specific event.",
          "href": "/events/{event_id}/ticket_classes/{ticket_class_id}",
          "method": "POST",
          "title": "update",
          "rel": "update",
          "schema": {
            "properties": {
              "ticket_class.description": {
                "description": "Description of the ticket class",
                "type": "string"
              },
              "ticket_class.qantity_total": {
                "description": "Total available number of this ticket class",
                "type": "string"
              },
              "ticket_class.cost.currency": {
                "description": "Currency of the ticket (must match event currency)",
                "type": "string"
              },
              "ticket_class.cost.value": {
                "description": "Ticket cost (in integer minor units of currency)",
                "type": "string"
              },
              "ticket_class.donation": {
                "description": "Is this a donation (user-determined cost)",
                "type": "boolean"
              },
              "ticket_class.free": {
                "description": "Is this a free ticket?",
                "type": "boolean"
              },
              "ticket_class.include_fee": {
                "description": "Absorb the fee into the displayed cost",
                "type": "boolean"
              },
              "ticket_class.split_fee": {
                "description": "Absorb the payment fee, but show the Eventbrite fee",
                "type": "boolean"
              },
              "ticket_class.hide_description": {
                "description": "Hide the ticket description on the event page",
                "type": "boolean"
              },
              "ticket_class.sales_start": {
                "description": "When the ticket is available for sale (leave empty for ‘when event is published’)",
                "type": "string",
                "format": "date-time"
              },
              "ticket_class.sales_start_after": {
                "description": "The ID of another ticket class – when it sells out, this class will go on sale",
                "type": "string"
              },
              "ticket_class.minimum_quantity": {
                "description": "Minimum number per order",
                "type": "number"
              },
              "ticket_class.maximum_quantity": {
                "description": "Maximum number per order",
                "type": "number"
              },
              "ticket_class.auto_hide": {
                "description": "Hide this ticket when it’s not on sale",
                "type": "boolean"
              },
              "ticket_class.auto_hide_before": {
                "description": "Override reveal date for auto-hide",
                "type": "boolean"
              },
              "ticket_class.auth_hide_after": {
                "description": "Override re-hide date for auto-hide",
                "type": "boolean"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Retrieve Event category options from across Eventbrite’s directory.",
          "href": "/categories",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Retrieve category details.",
          "href": "/categories/{category_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Retrieve Event subcategory options from across Eventbrite’s directory.",
          "href": "/subcategories",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Retrieve category details.",
          "href": "/subcategories/{subcategory_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Retrieve Event format options from across Eventbrite’s directory.",
          "href": "/formats",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Retrieve Event format details.",
          "href": "/formats/{format_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Create an event",
          "href": "/events",
          "method": "POST",
          "title": "create",
          "rel": "create",
          "schema": {
            "properties": {
              "event.name.html": {
                "description": "Name of the event",
                "type": "string"
              },
              "event.description": {
                "description": "Description of the event",
                "type": "string"
              },
              "event.organizer_id": {
                "description": "ID of the organizer this event",
                "type": "string"
              },
              "event.start.utc": {
                "description": "Start time of the event",
                "type": "string",
                "format": "date-time"
              },
              "event.start.timezone": {
                "description": "Start time timezone (Olson format)",
                "type": "string"
              },
              "event.end.utc": {
                "description": "Ent time of the event",
                "type": "string",
                "format": "date-time"
              },
              "event.end.timezone": {
                "description": "End time timezone (Olson format)",
                "type": "string"
              },
              "event.currency": {
                "description": "Event Currency (3 letter code)",
                "type": "string"
              },
              "event.venue_id": {
                "description": "ID of the venue (this or online_event is required)",
                "type": "string"
              },
              "event.online_event": {
                "description": "Is the event online-only (no venue)?",
                "type": "boolean"
              },
              "event.listed": {
                "description": "If the event is publicly listed and searchable",
                "type": "boolean"
              },
              "event.logo.id": {
                "description": "The logo for the event",
                "type": "string"
              },
              "event.category_id": {
                "description": "The category for the event",
                "type": "string"
              },
              "event.subcategory_id": {
                "description": "The subcategory for the event",
                "type": "string"
              },
              "event.format_id": {
                "description": "The format for the event",
                "type": "string"
              },
              "event.shareable": {
                "description": "If an event is shareable via social media",
                "type": "boolean"
              },
              "event.invite_only": {
                "description": "Only invited users can see the event page",
                "type": "boolean"
              },
              "event.password": {
                "description": "Password needed to see the event in unlisted mode",
                "type": "boolean"
              },
              "event.capacity": {
                "description": "Set specific capacity (if omitted, sums ticket capacities)",
                "type": "number"
              },
              "event.show_remaining": {
                "description": "If the remaining number of tickets is publicly visible on the event page",
                "type": "boolean"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Get details of a specific event within an Eventbrite account.",
          "href": "/events/{event_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Update event details of a specific event within an Eventbrite account.",
          "href": "/events/{event_id}",
          "method": "POST",
          "title": "update",
          "rel": "update",
          "schema": {
            "properties": {
              "event.name.html": {
                "description": "Name of the event",
                "type": "string"
              },
              "event.description": {
                "description": "Description of the event",
                "type": "string"
              },
              "event.organizer_id": {
                "description": "ID of the organizer this event",
                "type": "string"
              },
              "event.start.utc": {
                "description": "Start time of the event",
                "type": "string",
                "format": "date-time"
              },
              "event.start.timezone": {
                "description": "Start time timezone (Olson format)",
                "type": "string"
              },
              "event.end.utc": {
                "description": "Ent time of the event",
                "type": "string",
                "format": "date-time"
              },
              "event.end.timezone": {
                "description": "End time timezone (Olson format)",
                "type": "string"
              },
              "event.currency": {
                "description": "Event Currency (3 letter code)",
                "type": "string"
              },
              "event.venue_id": {
                "description": "ID of the venue (this or online_event is required)",
                "type": "string"
              },
              "event.online_event": {
                "description": "Is the event online-only (no venue)?",
                "type": "boolean"
              },
              "event.listed": {
                "description": "If the event is publicly listed and searchable",
                "type": "boolean"
              },
              "event.logo.id": {
                "description": "The logo for the event",
                "type": "string"
              },
              "event.category_id": {
                "description": "The category for the event",
                "type": "string"
              },
              "event.subcategory_id": {
                "description": "The subcategory for the event",
                "type": "string"
              },
              "event.format_id": {
                "description": "The format for the event",
                "type": "string"
              },
              "event.shareable": {
                "description": "If an event is shareable via social media",
                "type": "boolean"
              },
              "event.invite_only": {
                "description": "Only invited users can see the event page",
                "type": "boolean"
              },
              "event.password": {
                "description": "Password needed to see the event in unlisted mode",
                "type": "boolean"
              },
              "event.capacity": {
                "description": "Set specific capacity (if omitted, sums ticket capacities)",
                "type": "number"
              },
              "event.show_remaining": {
                "description": "If the remaining number of tickets is publicly visible on the event page",
                "type": "boolean"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Delete a specific event within an Eventbrite account.",
          "href": "/events/{event_id}",
          "method": "DELETE",
          "title": "delete",
          "rel": "destroy"
        },
        {
          "description": "Publish an event.",
          "href": "/events/{event_id}/publish",
          "method": "POST",
          "title": "publish",
          "rel": "parent-action"
        },
        {
          "description": "Unpublish an event.",
          "href": "/events/{event_id}/unpublish",
          "method": "POST",
          "title": "unpublish",
          "rel": "parent-action"
        },
        {
          "description": "Retrieve an event’s attendees",
          "href": "/events/{event_id}/attendees",
          "method": "GET",
          "title": "list",
          "rel": "instances",
          "schema": {
            "properties": {
              "status": {
                "description": "Valid values are “attending” and “not_attending” — not submitting a value will return all of the attendees regardless of status. “Attending” returns only attendees who are currently attending this event. “Not_attending” returns refunded, canceled and any other attendees who no longer have a valid ticket to this event. The default blank returns all attendees who have purchased a ticket to this event, regardless of their current status.",
                "type": "string"
              },
              "changed_since": {
                "description": "You can pass in a timestamp value for this field to receive Attendee records that have been changed since the timestamp.",
                "type": "string"
              },
              "expand": {
                "description": "‘promotional_code‘ displays if attendees have associated promotional codes (access codes or discount codes). ‘assigned_number‘ shows an attendee’s assigned number when applicable (assigned numbers are popular for participatory sports, but aren’t common on most Eventbrite events.",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Get detailed information on a specific attendee.",
          "href": "/events/{event_id}/attendees/{attendee_id}",
          "method": "GET",
          "title": "info",
          "rel": "self",
          "schema": {
            "properties": {
              "expand": {
                "description": "‘promotional_code‘ displays if attendees have associated promotional codes (access codes or discount codes). ‘assigned_number‘ shows an attendee’s assigned number when applicable (assigned numbers are popular for participatory sports, but aren’t common on most Eventbrite events.",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Get a list orders for an event.",
          "href": "/events/{event_id}/orders",
          "method": "GET",
          "title": "list",
          "rel": "instances",
          "schema": {
            "properties": {
              "status": {
                "description": "Valid values are “active” and “inactive” — not submitting a value will return all of the attendees regardless of status. “Active” returns only Orders that have been successfully ‘placed’ and not ‘refunded’ or ‘cancelled’. Passing in a value of ‘inactive’ will return Orders that have been refunded and canceled.",
                "type": "string"
              },
              "changed_since": {
                "description": "You can pass in a timestamp value for this field to receive Order records that have been changed since the timestamp.",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Get a list discounts for an event.",
          "href": "/events/{event_id}/discounts",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Get a specific discount for an event.",
          "href": "/events/{event_id}/discounts/{discount_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Create a discount for an event.",
          "href": "/events/{event_id}/discounts",
          "method": "POST",
          "title": "create",
          "rel": "create",
          "schema": {
            "properties": {
              "code": {
                "description": "Code used to activate discount.",
                "type": "string"
              },
              "amount_off": {
                "description": "The fixed amount off the ticket price.",
                "type": "number"
              },
              "percent_off": {
                "description": "The percentage off the ticket price.",
                "type": "number"
              },
              "ticket_ids": {
                "description": "IDs of tickets to associate discount codes.",
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "start_date": {
                "description": "The discount start date and time, in ISO 8601 format (e.g., “2007-12-31 23:59:59″).",
                "type": "string",
                "format": "date-time"
              },
              "end_date": {
                "description": "The discount end date and time.",
                "type": "string",
                "format": "date-time"
              },
              "quantity_available": {
                "description": "Maximum number of times this discount can be used.",
                "type": "number"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Update a discount for an event.",
          "href": "/events/{event_id}/discounts/{discount_id}",
          "method": "POST",
          "title": "update",
          "rel": "update",
          "schema": {
            "properties": {
              "code": {
                "description": "Code used to activate discount.",
                "type": "string"
              },
              "amount_off": {
                "description": "The fixed amount off the ticket price.",
                "type": "number"
              },
              "percent_off": {
                "description": "The percentage off the ticket price.",
                "type": "number"
              },
              "ticket_ids": {
                "description": "IDs of tickets to associate discount codes.",
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "start_date": {
                "description": "The discount start date and time, in ISO 8601 format (e.g., “2007-12-31 23:59:59″).",
                "type": "string",
                "format": "date-time"
              },
              "end_date": {
                "description": "The discount end date and time.",
                "type": "string",
                "format": "date-time"
              },
              "quantity_available": {
                "description": "Maximum number of times this discount can be used.",
                "type": "number"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Delete a specific discount for an event.",
          "href": "/events/{event_id}/discounts/{discount_id}",
          "method": "DELETE",
          "title": "delete",
          "rel": "destroy"
        },
        {
          "description": "Get a list of access codes for an event.",
          "href": "/events/{event_id}/access_codes",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Create an access codes for an event.",
          "href": "/events/{event_id}/access_codes",
          "method": "POST",
          "title": "create",
          "rel": "create",
          "properties": {
            "code": {
              "description": "Code used to activate access.",
              "type": "string"
            },
            "ticket_ids": {
              "description": "IDs of tickets to associate access codes.",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "start_date": {
              "description": "The access start date and time.",
              "type": "string",
              "format": "date-time"
            },
            "end_date": {
              "description": "The access end date and time.",
              "type": "string",
              "format": "date-time"
            },
            "quantity_available": {
              "description": "Maximum number of times this access code can be used.",
              "type": "number"
            }
          }
        },
        {
          "description": "Get details of an access code for an event.",
          "href": "/events/{event_id}/access_codes/{access_code_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Update an access codes for an event.",
          "href": "/events/{event_id}/access_codes/{access_code_id}",
          "method": "POST",
          "title": "update",
          "rel": "update",
          "properties": {
            "code": {
              "description": "Code used to activate access.",
              "type": "string"
            },
            "ticket_ids": {
              "description": "IDs of tickets to associate access codes.",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "start_date": {
              "description": "The access start date and time.",
              "type": "string",
              "format": "date-time"
            },
            "end_date": {
              "description": "The access end date and time.",
              "type": "string",
              "format": "date-time"
            },
            "quantity_available": {
              "description": "Maximum number of times this access code can be used.",
              "type": "number"
            }
          }
        },
        {
          "description": "Delete an access code for an event.",
          "href": "/events/{event_id}/access_codes/{access_code_id}",
          "method": "DELETE",
          "title": "delete",
          "rel": "destroy"
        },
        {
          "description": "Get a list of transfers for an event.",
          "href": "/events/{event_id}/transfers",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Get a list of teams for an event.",
          "href": "/events/{event_id}/teams",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Get individual team details for an event.",
          "href": "/events/{event_id}/teams/{team_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Get attendee information for a specific team.",
          "href": "/events/{event_id}/teams/{team_id}/attendees",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        }
      ]
    },
    "users": {
      "description": "Manage Eventbrite users.",
      "$schema": "http://json-schema.org/draft-04/hyper-schema",
      "type": "object",
      "links": [
        {
          "description": "Retrieve detailed information about the authenticated user.",
          "href": "/users/me",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Retrieve detailed information about a specific user.",
          "href": "/users/{user_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Retrieve Orders that are have been created on behalf of a specific user.",
          "href": "/users/{user_id}/orders",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Retrieve Events that are owned by a specific user. An event is considered to be ‘owned’ by a user if the event has been created by the user.",
          "href": "/users/{user_id}/owned_events",
          "method": "GET",
          "title": "list",
          "rel": "instances",
          "schema": {
            "properties": {
              "status": {
                "description": "Pull a user’s events based upon the ‘status’ of the event. Potential request parameters are ‘all’, ‘draft’, ‘live’, ‘cancelled’, ‘started’, and ‘ended’.",
                "type": "string"
              },
              "order_by": {
                "description": "Determine the order of a user’s events based upon the start date or creation date. Sort by ‘start_asc’, ‘start_desc’, ‘created_asc’, and ‘created_desc’.",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Retrieve orders that are owned by an event associated with a specific user. An order is considered to be ‘owned’ by a user if the order has been placed for with one of that respective user’s events.",
          "href": "/users/{user_id}/owned_event_orders",
          "method": "GET",
          "title": "list",
          "rel": "instances",
          "schema": {
            "properties": {
              "changed_since": {
                "description": "You can pass in a timestamp value for this field to receive Attendee records that have been changed since the timestamp.",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Retrieve attendees that are owned by an event associated with a specific user. An attendee is considered to be ‘owned’ by a user if the attendee is attending one of that respective user’s events.",
          "href": "/users/{user_id}/owned_event_attendees",
          "method": "GET",
          "title": "list",
          "rel": "instances",
          "schema": {
            "properties": {
              "expand": {
                "description": "‘promotional_code’ displays if attendees have associated promotional codes (access codes or discount codes). ‘assigned_number’ shows an attendee’s assigned number when applicable (assigned numbers are popular for participatory sports, but aren’t common on most Eventbrite events.",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Retrieve Venues that are have been created or admin-accessible by a specific user.",
          "href": "/users/{user_id}/venues",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Create a venue",
          "href": "/venues",
          "method": "POST",
          "title": "create",
          "rel": "create",
          "schema": {
            "properties": {
              "venue.name": {
                "description": "Name of the venue",
                "type": "string"
              },
              "venue.address": {
                "description": "Address (basic response type) for the venue",
                "type": ["string", "object"]
              },
              "venue.latitude": {
                "description": "The latitude component of the coordinates for the venue",
                "type": "string"
              },
              "venue.longitude": {
                "description": "The longitude component of the coordinates for the venue",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Get specific information on a user's venue",
          "href": "/venues/{venue_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Create an organizer.",
          "href": "/organizers",
          "method": "POST",
          "title": "create",
          "rel": "create",
          "schema": {
            "properties": {
              "organizer.name": {
                "description": "Name of the organizer",
                "type": "string"
              },
              "organizer.description.html": {
                "description": "Description of the organizer",
                "type": "string"
              },
              "organizer.logo.id": {
                "description": "The logo id of the organizer",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Update an organizer.",
          "href": "/organizers/{organizer_id}",
          "method": "POST",
          "title": "update",
          "rel": "update",
          "schema": {
            "properties": {
              "organizer.name": {
                "description": "Name of the organizer",
                "type": "string"
              },
              "organizer.description.html": {
                "description": "Description of the organizer",
                "type": "string"
              },
              "organizer.logo.id": {
                "description": "The logo id of the organizer",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Retrieve user's organizers.",
          "href": "/users/{user_id}/organizers",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Retrieve information on a specific organizer.",
          "href": "/organizers/{organizer_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        }
      ]
    },
    "orders": {
      "description": "Manage Eventbrite orders.",
      "$schema": "http://json-schema.org/draft-04/hyper-schema",
      "type": "object",
      "links": [
        {
          "description": "Retrieve a specific Order’s details.",
          "href": "/orders/{order_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        }
      ]
    },
    "contact_lists": {
      "description": "Manage Eventbrite contact lists.",
      "$schema": "http://json-schema.org/draft-04/hyper-schema",
      "type": "object",
      "links": [
        {
          "description": "Retrieve a specific contact lists.",
          "href": "/users/{user_id}/contact_lists",
          "method": "GET",
          "title": "list",
          "rel": "instances"
        },
        {
          "description": "Create a contact list for a user.",
          "href": "/users/{user_id}/contact_lists",
          "method": "POST",
          "title": "create",
          "rel": "create",
          "schema": {
            "properties": {
              "name": {
                "description": "Name of the contact list",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Update a contact list for a user.",
          "href": "/users/{user_id}/contact_lists/{contact_list_id}",
          "method": "POST",
          "title": "update",
          "rel": "update",
          "schema": {
            "properties": {
              "name": {
                "description": "Name of the contact list",
                "type": "string"
              }
            },
            "type": "object"
          }
        },
        {
          "description": "Get details of a user's contact list.",
          "href": "/users/{user_id}/contact_lists/{contact_list_id}",
          "method": "GET",
          "title": "info",
          "rel": "self"
        },
        {
          "description": "Delete a user's contact list.",
          "href": "/users/{user_id}/contact_lists/{contact_list_id}",
          "method": "DELETE",
          "title": "delete",
          "rel": "destroy"
        }
      ]
    }
  }
};