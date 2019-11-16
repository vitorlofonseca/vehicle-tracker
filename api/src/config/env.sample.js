const getEnv = () => {
  const dockerEnv = process.env;

  return {
    dashboard: {
      database: {
        host: dockerEnv.DASHBOARD_DB_HOST || "host",
        name: dockerEnv.DASHBOARD_DB_NAME || "databaseName"
      },
      api: {
        port: dockerEnv.API_PORT || "port",
        key: dockerEnv.API_KEY || "key-of-vehicle-tracker"
      }
    }
  };
};

module.exports = getEnv();
