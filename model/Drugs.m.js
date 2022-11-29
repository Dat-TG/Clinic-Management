const {db}=require('../model/Database.m');
module.exports = {
    getAll: async () => {
        rs=await db.collection('Drugs').find({}).toArray();
        return rs;
    }
}