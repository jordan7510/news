import { createClient, RedisClientType } from "redis";


let redisClient: RedisClientType | null = null

export async function getRedisClient(): Promise<RedisClientType> {
  if (redisClient) return redisClient;
  redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT!,10),
    },
  })

  redisClient.on("error", (err) => console.error("Redis error", err))
  redisClient.on("connect", () => console.log("Redis Connected"))
  await redisClient.connect();
  return redisClient;
}