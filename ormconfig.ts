

export default {
  type: "postgres",
  host: "queenie.db.elephantsql.com",
  port: 5432,
  username: "xgeqhdhm",
  password: "y3h6OKsRt3T7KgBsLp5SC9stC3MlE7n5",
  database: "xgeqhdhm",
  migrations: ["./src/database/migrations/**.ts"],
  entities: ["./src/models/**.ts"],
  logging: true,
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "./src/database/migrations",
  },
};