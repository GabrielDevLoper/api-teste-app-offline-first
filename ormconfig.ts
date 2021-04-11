

module.exports = {
  type: "postgres",
  host: "queenie.db.elephantsql.com",
  port: 5432,
  username: "xgeqhdhm",
  password: "y3h6OKsRt3T7KgBsLp5SC9stC3MlE7n5",
  database: "xgeqhdhm",
  migrations: [
    `./${process.env.DIRECTORY_TYPEORM}/database/migrations/**.${process.env.EXT}`,
  ],
  entities: [`./${process.env.DIRECTORY_TYPEORM}/models/**.${process.env.EXT}`],

  logging: true,
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "./src/database/migrations",
  },
};