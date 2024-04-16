const config = {
  app: {
    port: process.env.PORT || 8080
  },
  db: {
    BASE_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
    URI_PARAMS: `?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`
  }
};

export default config;
