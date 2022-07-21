const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require("ejs")

const app = express();
app.engine("html", ejs.renderFile)
app.set("view engine", "html")
app.set("views", __dirname + "/public/views");

app.use(bodyParser.urlencoded({ extended: false }));
const MongoClient = require('mongodb').MongoClient;

app.use(express.static(__dirname + "/public"));

var user;
var hlv;
var Bt;
var dataDK = [];
const StringConnection = "mongodb+srv://root:12345@cluster0.vit2y.mongodb.net/admin?authSource=admin&replicaSet=atlas-11exv1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

app.get("/", (req, res) => {
   res.sendFile("./public/views/indexFake.html", { root: __dirname });

})

app.get("/index", (req, res) => {
   res.render("index", { hlv: hlv })

})

app.get("/login", (req, res) => {
   res.sendFile("./public/views/login.html", { root: __dirname });

})

app.get("/signup", (req, res) => {
   res.sendFile("./public/views/signup.html", { root: __dirname });

})

app.get("/chuongtrinhtap", (req, res) => {
   res.sendFile("./public/views/chuongtrinhtap.html", { root: __dirname });

})

app.get("/manage_courses", (req, res) => {
   res.sendFile("./public/views/manage_courses.html", { root: __dirname });

})

//Check Sign Up
app.post("/checkSignUp", (req, res) => {
   MongoClient.connect(StringConnection, (err, client) => {
      if (err) throw err
      const db = client.db('account')

      db.collection('Account').insertOne({
         fullname: req.body.fullname,
         height: req.body.height,
         weight: req.body.weight,
         age: req.body.age,
         gender: req.body.gender,
         email: req.body.email,
         phone: req.body.phone,
         username: req.body.username,
         password: req.body.password,
      })
      console.log("ghi thanh cong");
      res.sendFile("./public/views/login.html", { root: __dirname })

   });
})

// check login
app.post("/", (req, res) => {
   // res.sendFile("./public/views/signup.html", { root: __dirname });
   MongoClient.connect(StringConnection, (err, client) => {
      if (err) throw err
      const db = client.db('account')
      function fun(data) {
         var check = false
         if ((req.body.username == "admin" && req.body.password == "admin") || (req.body.username == "Admin" && req.body.password == "Admin")) {
            db.collection('Hlv').find().toArray((err, result1) => {
               if (err) throw err
               hlv = result1
               db.collection('Bt').find().toArray((err, result2) => {
                  if (err) throw err
                  Bt = result2
                  res.render("admin2", { hlv: result1, bt: result2 })

               })

            })
            return
         }
         for (var i = 0; i < data.length; i++) {
            if (data[i].username == req.body.username && data[i].password == req.body.password) {
               user = data[i]
               check = true
               break
            }
         }
         if (check) {
            db.collection('Hlv').find().toArray((err, result) => {
               if (err) throw err
               hlv = result
               res.render("index", { hlv: hlv })
            })
         } else {
            res.sendFile("./public/views/login.html", { root: __dirname })
         }
      }
      db.collection('Account').find().toArray((err, result) => {
         if (err) throw err
         fun(result);
      })
   });
})
// them  huan luyen vien
app.post("/addHLV", (req, res) => {
   MongoClient.connect(StringConnection, async (err, client) => {
      if (err) throw err
      const db = client.db('account')
      await db.collection('Hlv').insertOne({
         hlvname: req.body.hlvname,
         hlvexp: req.body.hlvexp,
         hlvcerti: req.body.hlvcerti,
         hlvemail: req.body.hlvemail,
         hlvphone: req.body.hlvphone,
         linkFB: req.body.linkFB
      })
      await db.collection('Hlv').find().toArray((err, result1) => {
         if (err) throw err
         hlv = result1
         db.collection('Bt').find().toArray((err, result2) => {
            if (err) throw err
            Bt = result2
            console.log("add HLV database successfully !!");
            res.render("admin2", {
               hlv: result1,
               bt: result2
            })
         })
      })

   });
})

// add bai tap
app.post("/addBT", (req, res) => {
   MongoClient.connect(StringConnection, async (err, client) => {
      if (err) throw err
      const db = client.db('account')
      await db.collection('Bt').insertOne({
         Btname: req.body.Btname,
         Btlevel: req.body.Btlevel,
         Btreason: req.body.Btreason,
         Btvideo: req.body.Btvideo,
      })
      await db.collection('Hlv').find().toArray((err, result1) => {
         if (err) throw err
         hlv = result1
         db.collection('Bt').find().toArray((err, result2) => {
            if (err) throw err
            Bt = result2
            console.log("add Bt database successfully !!");
            res.render("admin2", {
               hlv: result1,
               bt: result2
            })
         })
      })
   });
})

//easy route
app.get("/easy", (req, res) => {
   // var temp =  JSON.parse(fs.readFileSync("data.json"))
   var arr1 = [];
   var arr2 = [];
   var arr3 = [];
   MongoClient.connect(StringConnection, (err, client) => {
      if (err) throw err
      const db = client.db('account')
      db.collection('Bt').find({ "Btlevel": "1" }).toArray((err, data) => {
         if (err) {
            res.send(err)
         } else {
            for (var i = 0; i < data.length; i++) {
               if (data[i].Btreason == "1") {
                  // console.log(i);
                  arr1.push(data[i]);
               }
               if (data[i].Btreason == "2") {
                  // console.log(i);
                  arr2.push(data[i]);
               }
               if (data[i].Btreason == "3") {
                  // console.log(i);
                  arr3.push(data[i]);
               }
            }
            res.render("easy", { data1: arr1, data2: arr2, data3: arr3 });
         }
      })
   })
})
//medium route
app.get("/medium", (req, res) => {
   // var temp =  JSON.parse(fs.readFileSync("data.json"))
   var arr1 = [];
   var arr2 = [];
   var arr3 = [];
   MongoClient.connect(StringConnection, (err, client) => {
      if (err) throw err
      const db = client.db('account')
      db.collection('Bt').find({ "Btlevel": "2" }).toArray((err, data) => {
         if (err) {
            res.send(err)
         } else {
            for (var i = 0; i < data.length; i++) {
               if (data[i].Btreason == "1") {
                  // console.log(i);
                  arr1.push(data[i]);
               }
               if (data[i].Btreason == "2") {
                  // console.log(i);
                  arr2.push(data[i]);
               }
               if (data[i].Btreason == "3") {
                  // console.log(i);
                  arr3.push(data[i]);
               }
            }
            res.render("medium", { data1: arr1, data2: arr2, data3: arr3 });
         }
      })
   })
})

//hard route
app.get("/hard", (req, res) => {
   // var temp =  JSON.parse(fs.readFileSync("data.json"))
   var arr1 = [];
   var arr2 = [];
   var arr3 = [];
   MongoClient.connect(StringConnection, (err, client) => {
      if (err) throw err
      const db = client.db('account')
      db.collection('Bt').find({ "Btlevel": "3" }).toArray((err, data) => {
         if (err) {
            res.send(err)
         } else {
            for (var i = 0; i < data.length; i++) {
               if (data[i].Btreason == "1") {
                  // console.log(i);
                  arr1.push(data[i]);
               }
               if (data[i].Btreason == "2") {
                  // console.log(i);
                  arr2.push(data[i]);
               }
               if (data[i].Btreason == "3") {
                  // console.log(i);
                  arr3.push(data[i]);
               }
            }
            res.render("hard", { data1: arr1, data2: arr2, data3: arr3 });
         }
      })
   })
})
// template nutrition
app.get("/nutrition", (req, res) => {

   console.log(user);
   res.render("nutrition", { user: user });
})

app.post("/detail", (req, res) => {
   const tdee = req.body.tdee
   const imme = 4000;
   const high = 6000;
   if (tdee >= high) {
      MongoClient.connect(StringConnection, (err, client) => {
         if (err) throw err
         const db = client.db('account')
         db.collection('Bt').find({ "Btlevel": "3" }).toArray((err, data) => {
            if (err) {
               res.send(err)
            } else {
               console.log('btlevel 3');
               res.render("detail", { user: user, tdee: tdee, bt: data })
            }
         })
      })
   } else if (tdee >= imme) {
      MongoClient.connect(StringConnection, (err, client) => {
         if (err) throw err
         const db = client.db('account')
         db.collection('Bt').find({ "Btlevel": "2" }).toArray((err, data) => {
            if (err) {
               res.send(err)
            } else {
               console.log('btlevel 2');
               res.render("detail", { user: user, tdee: tdee, bt: data })
            }
         })
      })

   } else {
      MongoClient.connect(StringConnection, (err, client) => {
         if (err) throw err
         const db = client.db('account')
         db.collection('Bt').find({ "Btlevel": "1" }).toArray((err, data) => {
            if (err) {
               res.send(err)
            } else {
               console.log('btlevel 1');
               console.log(data);
               res.render("detail", { user: user, tdee: tdee, bt: data })
            }
         })
      })
   }
   return
})

// xóa BT
app.post("/deleteBtByName", (req, res) => {
   console.log(req.body.deleteBtByName);
   MongoClient.connect(StringConnection, (err, client) => {
      if (err) throw err
      const db = client.db('account')
      db.collection("Bt").deleteOne({
         "Btname": req.body.deleteBtByName
      }, (err, result) => {
         if (err) throw err
         db.collection('Hlv').find().toArray((err, result1) => {
            if (err) throw err
            hlv = result1
            db.collection('Bt').find().toArray((err, result2) => {
               if (err) throw err
               Bt = result2
               res.render("admin2", {
                  hlv: result1,
                  bt: result2
               })
            })
         })
      })

   })
})

// xóa HLV
app.post("/deleteHlvByName", (req, res) => {
   console.log(req.body.deleteHlvByName);
   MongoClient.connect(StringConnection, (err, client) => {
      if (err) throw err
      const db = client.db('account')
      db.collection("Hlv").deleteOne({
         "hlvname": req.body.deleteHlvByName
      }, (err, result) => {
         if (err) throw err
         db.collection('Hlv').find().toArray((err, result1) => {
            if (err) throw err
            hlv = result1
            db.collection('Bt').find().toArray((err, result2) => {
               if (err) throw err
               Bt = result2
               res.render("admin2", {
                  hlv: result1,
                  bt: result2
               })
            })
         })
      })

   })
})

//ok
app.post("/updateHlvByName", (req, res) => {
   console.log(req.body.hlvname);
   MongoClient.connect(StringConnection, (err, client) => {
      if (err) throw err
      const db = client.db('account')
      db.collection("Hlv").replaceOne({ "hlvname": req.body.hlvname }, req.body, (err, result) => {
         if (err) throw err
         abc()
      })
      function abc() {
         db.collection('Hlv').find().toArray((err, result1) => {
            if (err) throw err
            hlv = result1
            db.collection('Bt').find().toArray((err, result2) => {
               if (err) throw err
               Bt = result2
               res.render("admin2", { hlv: result1, bt: result2 })
            })
         })
      }
      return

   })
})

//ok
app.post("/updateBtByName", (req, res) => {
   console.log(req.body.Btname);
   MongoClient.connect(StringConnection, async (err, client) => {
      if (err) throw err
      const db = client.db('account')
      await db.collection("Bt").replaceOne({ "Btname": req.body.Btname }, req.body, (err, result) => {
         if (err) throw err
         console.log("update xong");
      })
      await db.collection('Hlv').find().toArray((err, result1) => {
         if (err) throw err
         hlv = result1
         db.collection('Bt').find().toArray((err, result2) => {
            if (err) throw err
            Bt = result2
            res.render("admin2", { hlv: result1, bt: result2 })
         })
      })
      return

   })
})

app.listen(8080)


