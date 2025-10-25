import { getRedisClient } from "@/lib/redisClient";
import { Post } from "./Types";

export async function setCache(key: string,value:Post[],ttlInSeconds:number ) {

    const redis = await getRedisClient();
    
    if (ttlInSeconds) {
        await redis.set(key,JSON.stringify(value),{"EX":ttlInSeconds})
    }else{
        await redis.set(key,JSON.stringify(value))
    }
    
}