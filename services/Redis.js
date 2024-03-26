"use strict";

const redis = require("redis");
const {promisify} = require("util");

const credentials = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    prefix: `cribstock:${process.env.NODE_ENV}:`
};

console.log("Cred", credentials);


const redisClient = redis.createClient(credentials);
const password = process.env.REDIS_PASSWORD || null;
if (password && password != "null") {
    // debug("add", password, process.env.REDIS_PASSWORD, typeof password);
    redisClient.auth(password, (err, res) => {
        console.log("res", res);
        console.log("err", err);
    });
}

try {
    redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
    redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
    redisClient.lpushAsync = promisify(redisClient.lpush).bind(redisClient);
    redisClient.lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
    redisClient.llenAsync = promisify(redisClient.llen).bind(redisClient);
    redisClient.lremAsync = promisify(redisClient.lrem).bind(redisClient);
    redisClient.lsetAsync = promisify(redisClient.lset).bind(redisClient);
    redisClient.hmsetAsync = promisify(redisClient.hmset).bind(redisClient);
    redisClient.hmgetAsync = promisify(redisClient.hmget).bind(redisClient);
    redisClient.hgetallAsync = promisify(redisClient.hgetall).bind(redisClient);
    redisClient.hgetAsync = promisify(redisClient.hget).bind(redisClient);
    redisClient.hsetAsync = promisify(redisClient.hset).bind(redisClient);
    redisClient.hgetAllAsync = promisify(redisClient.hgetall).bind(redisClient);
    redisClient.hdelAsync = promisify(redisClient.hdel).bind(redisClient);
    redisClient.clear = promisify(redisClient.del).bind(redisClient);

    console.log("========= Promisifying redis functions Completed ============");
} catch (e) {
    console.log("redis error", e);
}


redisClient.on("connected", function () {
    console.log("Redis is connected");
});

redisClient.on("error", function (err) {
    console.log("Redis error.", err);
});

setInterval(function () {
    console.log("Keeping alive - " + process.env.APP_NAME);
    redisClient.set('ping', 'pong');
}, 1000 * 60 * 4);

global.cache = redisClient;
module.exports = redisClient;
