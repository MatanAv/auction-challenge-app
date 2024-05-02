const config = {
  app: {
    port: process.env.PORT || 8080,
    session: {
      secret: process.env.SESSION_SECRET,
      cookie: {
        domain: process.env.COOKIE_DOMAIN
      }
    }
  },
  db: {
    BASE_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}` || '',
    URI_PARAMS: `?retryWrites=true&w=majority&appName=${process.env.DB_NAME}` || ''
  },
  game: {
    approvalKey: process.env.APPROVAL_KEY || '1234'
  }
};

export default config;
