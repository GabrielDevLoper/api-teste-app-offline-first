import { ConnectionOptions } from "typeorm";

export default {
  type: "postgres",
  url: process.env.DATABASE_URL,
  port: 5432,
  synchronize: false,
  migrations: [
    `./${process.env.DIRECTORY_TYPEORM}/database/migrations/**.${process.env.EXT}`,
  ],
  entities: [`./${process.env.DIRECTORY_TYPEORM}/models/**.${process.env.EXT}`],

  logging: true,
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "./src/database/migrations",
  },
} as ConnectionOptions;