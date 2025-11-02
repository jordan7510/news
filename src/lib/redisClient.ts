import { createClient, RedisClientType } from "redis";

declare global {
  var redisPromise: Promise<RedisClientType> | undefined
}

const config = {
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!, 10),
    reconnectStrategy: (retries: number) => Math.min(retries * 50, 5000)
  },
}

async function  createConnetionProise(): Promise<RedisClientType> {
  console.log("Creating new connection and client promise");
  const redisClient: RedisClientType = createClient(config)

  redisClient.on("connect", () => console.log("Redis Connected"))
  redisClient.on("error", (err) => console.error("Redis error", err))
  redisClient.on("reconnecting", () => console.error("Redis reconnecting"))

  return redisClient
    .connect()
    .then(() => {
      return redisClient
    })
    .catch((err) => {
      console.error("error connecting redis", err);
      global.redisPromise = undefined
      throw err
    })
}


const connectionPromise: Promise<RedisClientType> = global.redisPromise ?? (global.redisPromise = createConnetionProise())
export async function getRedisClient(): Promise<RedisClientType> {
  return connectionPromise
}