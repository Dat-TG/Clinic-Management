const { db } = require('../model/Database.m');
module.exports = {
    add: async (data) => {
        var tomorow=new Date();
        tomorow.setHours(24,0,0,0);
        const rs = await db.collection('PatientsInDay').insertOne({
            expireAt: tomorow,
            Username: data.Username,
            Name: data.Name,
            DOB: data.DOB,
            Gender: data.Gender,
            Address: data.Address,
            Time: data.Time
        });
        return rs;
    },
    deleteAll: async()=>{
        await db.collection('PatientsInDay').deleteMany({});
    },
    getAll: async()=> {
        const rs=await db.collection('PatientsInDay').find({}).toArray();
        return rs;
    }
}