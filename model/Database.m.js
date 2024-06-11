const { MongoClient } = require("mongodb");
const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const db = client.db('ClinicManagement');
db.collection('PatientsInDay').createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } );
module.exports={
    db,
    client
}