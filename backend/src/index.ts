import {pgDatabaseService} from "./services/pg-database-service";
import cors from "cors";
import express, {Request, Response} from "express";
import colors from "colors/safe";
import {redisStoreService} from "./services/redis-store-service";
import {apolloService} from "./services/apollo-service";

const main = async () => {
  await pgDatabaseService.connect();
  await pgDatabaseService.runMigrations();

  const app = express();

  app.use(cors({origin: "http://localhost:3000", credentials: true}));

  app.use(redisStoreService.session());

  await apolloService.server();
  apolloService.use(app);

  app.get("/", (_req: Request, res: Response) => {
    res.setHeader("Content.Type", "application/json");
    res.status(200).send({hello: "world"});
  })

  app.listen(process.env.PORT, () => {
    console.log(`[${colors.cyan("INFO")}] express server listening on port: ${process.env.PORT}`);
  })
}

main().then();



