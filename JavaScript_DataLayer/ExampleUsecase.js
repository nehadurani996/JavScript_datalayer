let breadLayer = [];

function validateProcessName(processName) {
  const regex = /^(PM||CB||WM)-(Loan||Insurance||Pension||Other)-(\w+)-(\w+)$/;
  return regex.test(processName);
}

function validateDataLayerEvent(eventData) {
  // Check that the object is nested properly
  if (!eventData || !eventData.event || !eventData.page || !eventData.page.process) {
    console.error('Invalid data layer event structure');
    return false;
  }

  // Check data types
  if (typeof eventData.event !== 'string' || typeof eventData.page.process.name !== 'string') {
    console.error('Invalid data types in the data layer event');
    return false;
  }

  // Check process name format
  const processName = eventData.page.process.name;
  if (!validateProcessName(processName)) {
    console.error('Invalid process name:', processName);
    return false;
  }

  return true;
}

// Push to the data layer
breadLayer.push({
  "event": "PageLoaded",
  "page": {
    "process": {
      "application": "Mortgage Preapproval",
      "name": "WM-Pension-RetirementPlan-Review",
      "step": "Taxes and income",
      "type": "Funnel",
      "step_index": 0,
      "step_type": "Start"
    }
  }
});

// Validate the last pushed data
const lastEvent = breadLayer[breadLayer.length - 1];
const isValid = validateDataLayerEvent(lastEvent);
console.log('Data layer event is valid:', isValid);
