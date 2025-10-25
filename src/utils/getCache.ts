import { getRedisClient } from "@/lib/redisClient";

export async function getCache( key: string ) {
    const redis = await getRedisClient();
    const cache = await redis.get(key)
    if (!cache) return null 
    try{
        return JSON.parse(cache)
    }catch{
        return cache
    }

}