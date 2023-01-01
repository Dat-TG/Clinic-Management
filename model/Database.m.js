const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://NMCNPM:Nhom21@sandbox.2jh56pc.mongodb.net/test";
const client = new MongoClient(uri);
const db = client.db('ClinicManagement');
db.collection('PatientsInDay').createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } );
module.exports={
    db
}