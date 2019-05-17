const redis = require("redis");
const { promisify } = require('util');


function Singleton() {
  this.instance = null;
  this.getInstance = function getInstance(port) {
      if (!this.instance) this.instance = redis.createClient(port);

      return this.instance;
  }
}

let singleton = new Singleton();



module.exports = function (port) {
  return singleton.getInstance(port);
}