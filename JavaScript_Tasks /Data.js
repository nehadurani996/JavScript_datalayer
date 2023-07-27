// Define the validation schema under data elements

breadLayer.validateJSONSchema = payload => {
  const schema = _satellite.getVar('Validation Schema') || {};
  if (typeof schema !== 'object') {
    console.error('Schema is not an object');
    return false;
  }
  // Check if event property exists and is a string
  const a = ['event', 'name'];
for (let i in a) {
  if (!schema.hasOwnProperty(a[i]) || typeof schema.event !== 'string') {
    console.error('Schema does not contain a valid event property');
    return false;
  }
}

  // Check if url property exists and is a string
  // Note: this is not a required property, so it's okay if it's undefined
  if (schema.hasOwnProperty('url') && typeof schema.url !== 'string') {
    console.error('Schema contains an invalid url property');
    return false;
  }
  return true;

}
const errors = validateJSONSchema(schema, Breadlayer);
  if (errors) {
    console.log('Validation errors:', errors);
  } else {
    console.log('Data is valid!');
  }
  