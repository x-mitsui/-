const red = require("../db/connection/redis_connect");

function redisSet(key, value, timeout = 60 * 60 /*1 hour*/) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  red.set(key, value);
  red.expire(key, timeout);
}

function redisGet(key) {
  return red
    .get(key)
    .then((value) => {
      return JSON.parse(value);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  redisGet,
  redisSet,
};
