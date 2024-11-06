const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3055,
  },
  db: {
    url: process.env.DEV_DB_URL || "localhost",
    name: process.env.DEV_DB_MONGODB_NAME || "dbs",
    port: process.env.DEV_DB_MONGODB_PORT || "27017",
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

const env = process.env.NODE_ENV;

console.log(`NODE_ENV: ${env}`);

export default config[env ?? "dev"];
