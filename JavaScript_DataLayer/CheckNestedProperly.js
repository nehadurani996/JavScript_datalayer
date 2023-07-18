function isJSONProperlyNested(jsonString) {
    try {
      const jsonObject = JSON.parse(jsonString);
      return isObject(jsonObject); // Check if the top-level structure is an object
    } catch (error) {
      return false; // JSON parsing error
    }
  }
  
  function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);     //value is object and is not null as the null is also object and is not array as arrays are also 
  }
  
  // Example usage:
  const jsonString = `{
    "event": "PageLoaded",
    "page": {
      "process": {
        "application": "Mortgage Preapproval",
        "name": "PM - mortgagepreapproval, new/first property (fp)",
        "step": "Taxes and income",
        "type": "Funnel",
        "step_index": 0,
        "step_type": "Start"
      }
    }
  }`;

console.log(isJSONProperlyNested(jsonString));
  