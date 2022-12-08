const {db}=require('../model/Database.m');
module.exports = {
    getAll: async () => {
        const rs=await db.collection('Doctors').find({}).toArray();
        return rs;
    },
    getByName: async(Name) => {
        const rs=await db.collection('Doctors').find({Name:Name}).toArray();
        return rs;
    },
    getByID: async(ID) => {
        const rs=await db.collection('Doctors').find({ID:ID}).toArray();
        return rs;
    }
}