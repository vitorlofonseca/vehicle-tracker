const mongoose = require("mongoose");

const getConnectionString = env => {
  return (
    "mongodb://" +
    env.dashboard.database.host +
    "/" +
    env.dashboard.database.name
  );
};

module.exports.connect = env => {
  const connectionString = getConnectionString(env);

  mongoose
    .connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log("Connected");
    })
    .catch(err => {
      console.log("Error :: " + err);
    });
};
