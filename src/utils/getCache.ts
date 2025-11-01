import { getRedisClient } from "@/lib/redisClient";
// import { Cat } from "./Types";

export async function getCache<T>( key: string ):Promise<T | null> {
    const redis = await getRedisClient();
    const cache= await redis.get(key)
    if (!cache) return null 
    try{
        return JSON.parse(cache)
    }catch{
        console.error(`Failed to parse cache for key: ${key}`);
        return null
    }

}