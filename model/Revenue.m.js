const { ObjectID } = require('bson');
const {db}=require('../model/Database.m');
module.exports = {
    add: async (data) => {
        const rs = await db.collection('Revenue').insertOne(data);
        return rs;
    },
    getAll: async () => {
        const rs=await db.collection('Revenue').find({}).toArray();
        return rs;
    },
    getByID: async(ID) => {
        const rs=await db.collection('Revenue').find({_id:new ObjectID(ID)}).toArray();
        return rs;
    }
}