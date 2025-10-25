import Redis from "ioredis";

let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (redis) return redis; // reuse existing connection

  const host = process.env.REDIS_HOST;
  const port = parseInt(process.env.REDIS_PORT || "6379", 10);
  const username = process.env.REDIS_USERNAME || "default";
  const password = process.env.REDIS_PASSWORD || "";
  const useTls = process.env.REDIS_TLS === "true";

  if (!host) {
    throw new Error("❌ Missing Redis host in environment variables");
  }

  redis = new Redis({
    host,
    port,
    username,
    password,
    tls: useTls ? {} : undefined, // TLS for production
    lazyConnect: true, // connect only when needed
    maxRetriesPerRequest: 3,
    reconnectOnError: (err) => {
      if (err.message.includes("READONLY")) {
        console.warn("🔁 Redis reconnecting after READONLY error");
        return true;
      }
      return false;
    },
  });

  redis.on("connect", () => console.log("✅ Redis connected"));
  redis.on("error", (err) => console.error("❌ Redis error:", err.message));

  return redis;
}
