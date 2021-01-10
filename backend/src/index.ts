import {pgDatabaseService} from "./services/pg-database-service";
import express, {NextFunction, Request, Response} from "express";
import {redisStoreService} from "./services/redis-store-service";


const main = async () => {
  await pgDatabaseService.connect();
  await pgDatabaseService.runMigrations();

  // const {db} = pgDatabaseService;
  //
  // const course = db.em.create(CourseEntity, {title: "test"});
  // await db.em.persistAndFlush(course);
  //
  // const courses = await db.em.find(CourseEntity, {});
  // console.log(courses);

  const app = express();

  app.use(redisStoreService.session());

  app.use(function (req: Request, res: Response, next: NextFunction) {
    if (!req.session) {
      res.status(404).send({message: "SESSION NOT FOUND"});
    }

    next();
  })

  app.listen(process.env.PORT, ()=> {
    console.log(`Listening on port: ${process.env.PORT}`);
  })
}

main();



