// Added capatilize function

function capitalizeObjectKeys(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const capitalizedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      capitalizedObj[capitalizedKey] = typeof obj[key] === 'string' ? obj[key].charAt(0).toUpperCase() + obj[key].slice(1) : capitalizeObjectKeys(obj[key]);
    }
  }

  return capitalizedObj;
}



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
  }
};

// Function to validate a data object against the schema
function validateEventPayload(eventPayload, schema) {
  for (const propertyName in schema.properties) {
    if (eventPayload.hasOwnProperty(propertyName)) {
      const property = schema.properties[propertyName];

      if (property.type === 'object' && typeof eventPayload[propertyName] === 'object' && eventPayload[propertyName] !== null) {
        // Recursively validate nested object
        const isValidNestedObject = validateEventPayload(eventPayload[propertyName], property);
        if (!isValidNestedObject) {
          return false;
        }
      } else {
        if (typeof eventPayload[propertyName] !== property.type) {
          console.error('Error: Event payload contains an invalid ' + property.type + ' in ' + propertyName);
          return false;
        }
      }
    } 
  }

  return true;
}

// Example nested JSON object
const data = {
  id: 123, // This is the required 'id' property
  name: 'john Doe',
  address: {
    street: '123 Main St',
    city: 'new York',
    postalCode: '10001'
  }
};

// Perform validation and push to breadLayer
const breadLayer = [];
breadLayer.push = (eventPayload) => {
  if (!eventPayload) {
    console.error('Error: No event payload provided to push to breadLayer');
    return null;
  }

  const capitalizedPayload = capitalizeObjectKeys(eventPayload);
  const valid = validateEventPayload(capitalizedPayload, schema);
  if (!valid) {
    console.error('Error: Invalid event payload');
    return null;
  }

  Array.prototype.push.call(breadLayer, capitalizedPayload);
  console.log('breadLayer:', breadLayer); // Debug log to check if the data is getting pushed
};

breadLayer.push(data); // Ensure this line is executed in your environment

// Add a log message to indicate the end of the script execution
console.log('Script execution completed.');

