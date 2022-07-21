const mongodb = require("mongodb").MongoClient;
var db;

module.exports = {
  connection: function (callback) {
    mongodb.connect(
      "mongodb+srv://root:12345@cluster0.vit2y.mongodb.net/test?authSource=admin&replicaSet=atlas-11exv1-shard-0&readPreference=primary&ssl=true",
      (err, client) => {
        if (err) console.log(err);
        db = client.db("TEST175");
        console.log("connecting !!");
        callback();
      }
    );
  },
  getDb: () => {
    return db;
  },
};
//