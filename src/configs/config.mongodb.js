const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3055,
  },
  db: {
    url: process.env.DEV_DB_URL || "localhost",
    name: process.env.DEV_DB_NAME || "dbs",
    port: process.env.DEV_DB_PORT || "27017",
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT || 3055,
  },
  db: {
    url: process.env.PROD_DB_URL || "localhost",
    name: process.env.PROD_DB_NAME || "prodDB",
    port: process.env.PROD_DB_PORT || "27017",
  },
};

const config = {
  dev,
  prod,
};

const env = process.env.NODE_ENV || "dev";

export default config[env];
