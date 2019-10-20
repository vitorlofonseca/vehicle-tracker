function whyMetricIsInvalid(metric) {
  let error = null;

  if (!metric) {
    return "An object 'metric' must be setted, with 'code', 'name' and 'value'";
  }

  if (!metric.code) {
    return "The 'metric' object must have 'code' parameter";
  }
  if (!metric.name) {
    return "The 'metric' object must have 'name' parameter";
  }
  if (!metric.value) {
    return "The 'metric' object must have 'value' parameter";
  }
  if (!metric.unit) {
    return "The 'metric' object must have 'unit' parameter";
  }

  return error;
}

function getLastMetrics(oldLastMetrics, metricToUpdate) {
  if (!oldLastMetrics) {
    return [metricToUpdate];
  }

  let itsANewMetric = true;

  let newLastMetrics = oldLastMetrics.map(oldLastMetric => {
    if (oldLastMetric.code == metricToUpdate.code) {
      itsANewMetric = false;
      return metricToUpdate;
    }
    return oldLastMetric;
  });

  if (itsANewMetric) {
    newLastMetrics.push(metricToUpdate);
  }

  return newLastMetrics;
}

const push = ({ Metric, Device }) => async (req, res, next) => {
  let deviceMacAddress = req.body.deviceMacAddress;

  if (!deviceMacAddress) {
    res.status(400).send("A 'deviceMacAddress' field must be passed");
  }

  let device = await Device.findOne({ macAddress: deviceMacAddress });

  if (!device) {
    res.status(404).send("Device not found");
  }

  let metrics = req.body.metrics;

  if (!metrics) {
    res
      .status(400)
      .send("A 'metrics' field must be passed, containing the metrics");
  }

  if (!Array.isArray(metrics)) {
    res.status(400).send("The 'metrics' field must be an array");
  }

  let lastMetrics = device.metrics.last;

  await metrics.forEach(async metric => {
    if (whyMetricIsInvalid(metric)) {
      res.status(400).send(whyMetricIsInvalid(metric));
    }
    metric.insertedAt = new Date();
    lastMetrics = getLastMetrics(lastMetrics, metric);
  });

  await Device.updateOne(
    { macAddress: deviceMacAddress },
    { $set: { "metrics.last": lastMetrics } }
  );

  await Device.updateOne(
    { macAddress: deviceMacAddress },
    { $push: { "metrics.history": { $each: metrics } } }
  );

  res.status(200).send("inserted");
};

module.exports = push;
