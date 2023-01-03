const { ObjectID } = require('bson');
const {db}=require('../model/Database.m');
module.exports = {
    add: async (data) => {
        const rs = await db.collection('Drug-Report').insertOne(data);
        return rs;
    },
    getAll: async () => {
        const rs=await db.collection('Drug-Report').find({}).toArray();
        return rs;
    },
    getByID: async(ID) => {
        const rs=await db.collection('Drug-Report').find({_id:new ObjectID(ID)}).toArray();
        return rs;
    }
}