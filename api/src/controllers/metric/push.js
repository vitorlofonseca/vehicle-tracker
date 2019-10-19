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

  let metric = req.body.metric;

  if (whyMetricIsInvalid(metric)) {
    res.status(400).send(whyMetricIsInvalid(metric));
  }

  let device = await Device.findOne({ macAddress: deviceMacAddress });

  if (!device) {
    res.status(404).send("Device not found");
  }

  metric.insertedAt = new Date();

  await Device.updateOne(
    { macAddress: deviceMacAddress },
    { $push: { "metrics.history": metric } }
  );

  let lastMetrics = getLastMetrics(device.metrics.last, metric);

  await Device.updateOne(
    { macAddress: deviceMacAddress },
    { $set: { "metrics.last": lastMetrics } }
  );

  res.status(200).send("inserted");
};

module.exports = push;
