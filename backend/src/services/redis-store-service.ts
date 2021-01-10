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
      store: new RedisStore({client: redisClient, disableTouch: true}), // Does not increase TTL
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__ // cookie only works in https and production
      },
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
    });
  }
}


export const redisStoreService = new RedisStoreService();
