const schema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        postalCode: { type: 'string' }
      }
    }
  },
  required: ['id', 'name', 'address']
};
// Function to validate a data object against the schema
function validateEventPayload(eventPayload, schema) {
  for (var propertyName in schema.properties) {
    if (eventPayload.hasOwnProperty(propertyName)) {
      var property = schema.properties[propertyName];

      if (property.type === 'object' && typeof eventPayload[propertyName] === 'object' && eventPayload[propertyName] !== null) {
        // Recursively validate nested object
        var isValidNestedObject = validateEventPayload(eventPayload[propertyName], property);
        if (!isValidNestedObject) {
          return false;
        }
      } else {
        if (typeof eventPayload[propertyName] !== property.type) {
          console.error('Error: Event payload contains an invalid ' + property.type + ' in ' + propertyName);
          return false;
        }
      }
    } else {
      console.error('Error: Event payload is missing required property: ' + propertyName);
      return false;
    }
  }

  return true;
}

// Example nested JSON object
const data = {
  id: 123,
  name: 'John Doe',
  address: {
    street: '123 Main St',
    city: 'New York',
    postalCode: '10001'
  }
};

// Perform validation
const isValid = validateEventPayload(data, schema);
console.log('Data is valid:', isValid);
