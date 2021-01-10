import {CourseEntity} from "./models/course.entity";
import {__prod__} from "./config/constants";
import {MikroORM} from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[jt]s$/
  },
  entities: [CourseEntity],
  dbName: process.env.POSTGRES_DATABASE || "bible_courses",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD || "password",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];

