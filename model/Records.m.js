const { db } = require('../model/Database.m');
module.exports = {
    add: async (data) => {
        const rs = await db.collection('MedicalRecords').insertOne(data);
        return rs;
    },
    getByUsername: async(username)=> {
        const rs=await db.collection('MedicalRecords').find({Username:username}).toArray();
        return rs;
    },
    getMaxID: async()=>{
        const rs=await db.collection('MedicalRecords').find({}).sort("ID",-1).limit(1).toArray();
        return rs;
    },
    getAll: async()=> {
        const rs=await db.collection('MedicalRecords').find({}).toArray();
        return rs;
    },
    getByID: async(ID)=> {
        const rs=await db.collection('MedicalRecords').find({ID:ID}).toArray();
        return rs;
    }
}