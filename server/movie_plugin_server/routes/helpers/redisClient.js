const redis = require("redis");
const { promisify } = require('util');

function Singleton() {
  this.instance = null;
  this.getInstance = function getInstance(port) {
    if (!this.instance) {
      const client =  redis.createClient(port);

      this.instance = {
        instance: client,
        hgetallAsync: promisify(client.hgetall).bind(client),
        hmsetAsync: promisify(client.hmset).bind(client),
        existAsync: promisify(client.exists).bind(client)
      };
    }

    return this.instance;
  }
}

let singleton = new Singleton();

module.exports = function (port) {
  return singleton.getInstance(port);
}