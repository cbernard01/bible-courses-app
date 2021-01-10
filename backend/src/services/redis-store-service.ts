import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import {__prod__} from "../config/constants";

const RedisStore = connectRedis(session)
const redisClient = redis.createClient()

class RedisStoreService {

  session() {
    return session({
      name: 'qid',
      store: new RedisStore({client: redisClient, disableTouch: !__prod__}), // Does not increase TTL in development
      cookie: {
        maxAge: Number(process.env.REDIS_MAXAGE), // 1 year in development
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https and production
      },
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
    });
  }
}

export const redisStoreService = new RedisStoreService();
