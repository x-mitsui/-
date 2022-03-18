const redis = require("redis");
const { REDIS_CONF } = require("../../config/db_config");
const red = redis.createClient(REDIS_CONF);
// (async () => {
red.on("error", (error) => {
  console.error("Redis error:", error);
});
red.connect();
// })();

module.exports = red;
