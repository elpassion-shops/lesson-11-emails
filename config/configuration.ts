export const config = {
  sendGrid: {
    api_key: process.env.SENDGRID_API_KEY,
    from: "klaudiusz.witt@gmail.com",
  },
  database: {
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  emailMsgConfig: {
    from: "klaudiusz.witt@gmail.com",
    subject: "Vote please.",
  },
};
