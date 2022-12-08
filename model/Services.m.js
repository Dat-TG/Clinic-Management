const {db}=require('../model/Database.m');
module.exports = {
    getAll: async () => {
        const rs=await db.collection('Services').find({}).toArray();
        return rs;
    },
    getByName: async(Name) => {
        const rs=await db.collection('Services').find({Name:Name}).toArray();
        return rs;
    },
    getByID: async(ID) => {
        const rs=await db.collection('Services').find({ID:ID}).toArray();
        return rs;
    }
}