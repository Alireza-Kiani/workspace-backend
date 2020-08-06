//imports
import redis from "redis";
import util from "util";

//connecting to redis server
const redisURL = "redis://127.0.0.1:6379";
const client = redis.createClient(redisURL);

if(!client) {
    console.log("redis server is down");
} else {
    console.log("Redis server connected")
}

client.hget = util.promisify(client.hget);
client.hgetall = util.promisify(client.hgetall);
client.get = util.promisify(client.get);
client.hdel = util.promisify(client.hdel);


export let cacheIt = async (hashKey, key, input, toggle) => {
    //toggle = true -> set
    //toggle = false -> get

    if (key.isEmpty) {
        return
    }

    if (toggle) {
        client.hset(hashKey, key, JSON.stringify(input));
    } else {
        const output = await client.hget(hashKey, key);
        return JSON.parse(output);
    }
};

export const clearCache = async (hKey, key) => {
    await client.hdel(hKey, key);
};
