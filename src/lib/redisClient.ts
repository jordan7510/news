import { Post } from "@/utils/Types"
import { createClient, RedisClientType } from "redis"

let redisClient: RedisClientType | null = null

const redisConfig = {
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
    reconnectStrategy: (retries: number) => Math.min(retries * 50, 5000)
  },
  maxRetriesPerRequest: 3,
  connectTimeout: 5000,
  lazyConnect: true,
}

export default function isRedisEnabled(){
 if(process.env.USE_REDIS_CACHE === "false") return false
 return true
}

async function startRedisConnection() {
  if (!isRedisEnabled()) {
    console.log("Redis cache disabled")
    return null
  }
  if (!redisClient) {
    try {
      redisClient = createClient(redisConfig)

      redisClient.on("connect", () => {
        console.log("Redis connected");
      })
      redisClient.on("error", (err) => {
        console.log("Redis connection error", err)
      })
      await redisClient.connect()
    } catch (error) {
      console.error("Redis connection failed", error);
      throw new Error("Redis connection failed.")
    }
  }
}

export async function getRedisClient(): Promise<RedisClientType | null> {
  if(!isRedisEnabled()) return null
  if (!redisClient) {
    await startRedisConnection()
  }
  return redisClient
}

(async () => {
  try {
    await startRedisConnection()
  } catch (error) {
    console.error("Redis start error.", error)
  }
})()



export async function getCache(key: string) {
   if(!isRedisEnabled()) return null
  try {
    const redis = await getRedisClient();
    if(!redis) return null
    const cache = await redis.get(key)
    return cache ? JSON.parse(cache) : null
  } catch {
    console.error(`Failed to get cache for key: ${key}`);
    return null
  }
}

export async function setCache(key: string, value: Post[], ttlInSeconds: number) {
  if(!isRedisEnabled()) return null
  const redis = await getRedisClient();
  if(!redis) return null
  if (ttlInSeconds) {
    await redis.set(key, JSON.stringify(value), { "EX": ttlInSeconds })
  } else {
    await redis.set(key, JSON.stringify(value))
  }

}