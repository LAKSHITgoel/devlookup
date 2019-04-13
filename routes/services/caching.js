// const mongoose = require("mongoose");
// const redis = require("redis");
// const redisURL = "redis://127.0.0.1:6379";
// const util = require("util");
// const client = redis.createClient(redisURL);

// client.get = util.promisify(client.get);
// // client.set = util.promisify(client.set);

// mongoose.Query.prototype.cache = function() {
//   this.useCache = true;
//   return this;
// };

// const exec = mongoose.Query.prototype.exec;
// // mongoose.Query.prototype.cache = function() {
// //   console.log(this);
// //   this.useCache = true;
// //   return this;
// // };
// mongoose.Query.prototype.exec = async function() {
//   if (!this.useCache) {
//     return exec.apply(this, arguments);
//   }

//   const key = JSON.stringify(
//     Object.assign({}, this.getQuery(), {
//       collection: this.mongooseCollection.name
//     })
//   );
//   console.log("key", key);

//   // Check if we have a value for the above 'key' iin redis
//   const cacheValue = await client.get(key);
//   // if we do then we return that value
//   if (cacheValue) {
//     console.log("serving from cache");
//     let doc = JSON.parse(cacheValue);
//     return Array.isArray(doc)
//       ? doc.map(d => new this.model(d))
//       : new this.model(doc);
//   }
//   //if we dont then run query and save to redis
//   const result = await exec.apply(this, arguments);
//   client.set(key, JSON.stringify(result), redis.print);
//   console.log("serving from db");
//   return result;
// };
