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

async function startRedisConnection() {
  if (!redisClient) {
    try {
      redisClient = createClient(redisConfig)

      redisClient.on("connect", () => {
        console.log("Redis connected");
      })
      redisClient.on("error", (err) => {
        console.log("Redis connection error", err)
      })
      await redisClient.connect();

    } catch (error) {
      console.error("Redis connection failed", error);
      throw new Error("Redis connection failed.")
    }
  }
}

export async function getRedisClient():Promise<RedisClientType> {
  if(!redisClient){
    throw new Error("Redis client not started.")
  }
  return redisClient
}

(async()=>{
  try {
    await startRedisConnection()
  } catch (error) {
      console.error("Redis start error.", error)
  }
})()



