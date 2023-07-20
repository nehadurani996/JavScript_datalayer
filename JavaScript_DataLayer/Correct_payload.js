// Ensure that window.breadLayer exists
window.breadLayer = window.breadLayer || [];

// Define the schema for the event payload that we want to validate before adding to the breadLayer array
var schema = {
  type: 'object',
  properties: {
    event: { type: 'string' },
    event_type: { type: 'string' }
  },
  required: ['event']
};

// Function to validate a event payload object against the schema
function validateEventPayload(eventPayload) {
  // Validate required properties
  for (var i = 0; i < schema.required.length; i++) {
    var propertyName = schema.required[i];
    var property = schema.properties[propertyName];

    // If required property doesn't exist in event payload
    if (!eventPayload.hasOwnProperty(propertyName)) {
      console.error('Error: Event payload does not contain a valid ' + propertyName);
      return false;
    }

    // If property isn't of required type
    if (typeof eventPayload[propertyName] !== property.type) {
      console.error('Error: Event payload contains an invalid ' + property.type + ' in ' + propertyName);
      return false;
    }
  }

  // Validate non-required properties
  for (var propertyName in eventPayload) {
    if (schema.properties.hasOwnProperty(propertyName)) {
      var property = schema.properties[propertyName];

      // If property isn't of required type
      if (typeof eventPayload[propertyName] !== property.type) {
        console.error('Error: Event payload contains an invalid ' + property.type + ' in ' + propertyName);
        return false;
      }
    } else {
      console.error('Error: Event payload contains an extra property not defined in the schema: ' + propertyName);
      return false;
    }
  }

  return true;
}

// Function to push a schema to the breadLayer array
window.breadLayer.pushSchema = function(eventPayload) {
  if (!eventPayload) {
    console.error('Error: No event payload provided to push to breadLayer');
    return;
  }

  var valid = validateEventPayload(eventPayload);
  if (!valid) {
    console.error('Error: Invalid event payload');
    return;
  }

  this.push(eventPayload);
};
