import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | null = null

export async function getRedisClient(): Promise<RedisClientType> {
  if (redisClient) return redisClient;
  redisClient = createClient({
    username: 'default',
    password: '2ElxYMM7pMTQJrBimoVxpv1oeBmApxma',
    socket: {
      host: 'redis-13221.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
      port: 13221,
    },
  })

  redisClient.on("error", (err) => console.error("Redis error", err))
  redisClient.on("connect", () => console.log("Redis Connected"))
  await redisClient.connect();
  return redisClient;
}