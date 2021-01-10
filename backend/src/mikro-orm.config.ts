import path from "path";
import {MikroORM} from "@mikro-orm/core";
import {__prod__} from "./config/constants";
import {CourseEntity} from "./models/course-entity";
import {UserEntity} from "./models/user-entity";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[jt]s$/
  },
  entities: [CourseEntity, UserEntity],
  dbName: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];

