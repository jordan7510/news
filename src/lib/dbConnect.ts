import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable")
}


/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections from growing exponentially.
 */
declare global {
    var mongooseCache: {conn: Mongoose | null, promise: Promise<Mongoose> | null}
}

let cached = global.mongooseCache;

if(!cached){
    cached = global.mongooseCache = {conn:null, promise:null}
}

async function dbConnect():Promise<Mongoose> {
    if(cached.conn) return cached.conn

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstace)=>{
            console.log("MongoDB Connected")
            return mongooseInstace
        })
        .catch((err)=>{
            console.log("MongoDB Connection error", err)
            cached.promise = null
            throw err
        })
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
