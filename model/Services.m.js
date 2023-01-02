const {db}=require('../model/Database.m');
module.exports = {
    getAll: async () => {
        const rs=await db.collection('Services').find({}).toArray();
        return rs;
    },
    getByName: async(Name) => {
        const rs=await db.collection('Services').find({ServiceName:Name}).toArray();
        return rs;
    },
    getByID: async(ID) => {
        const rs=await db.collection('Services').find({ID:ID}).toArray();
        return rs;
    },
    update: async(ID,data) => {
        await db.collection('Services').updateOne({ID:ID},{$set:data},{upsert:true});
    },
    delete: async(ID)=>{
        await db.collection('Services').deleteOne({ID:ID});
    }
}