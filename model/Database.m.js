const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://NMCNPM:Nhom21@sandbox.2jh56pc.mongodb.net/test";
const client = new MongoClient(uri);
const db = client.db('ClinicManagement');
module.exports={
    db
}