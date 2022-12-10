const { db } = require('../model/Database.m');
module.exports = {
    add: async (data) => {
        const rs = await db.collection('Users').insertOne({
            Username: data.Username,
            Password: data.Password,
            Name: data.Name,
            DOB: data.DOB,
            Gender: data.Gender,
            Phone: data.Phone,
            Email: data.Email,
            Address: data.Address,
            ID: data.ID
        });
        return rs;
    },
    getByUsername: async(Username)=> {
        const rs=await db.collection('Users').find({Username:Username}).toArray();
        return rs;
    },
    getMaxID: async()=>{
        const rs=await db.collection('Users').find({}).sort("ID",-1).limit(1).toArray();
        return rs;
    },
    getAll: async()=> {
        const rs=await db.collection('Users').find({}).toArray();
        return rs;
    },
    update: async(user,data) => {
        await db.collection('Users').updateOne({Username:user},{$set:data},{upsert:true});
    },
    changePassword: async(user,newpass) =>{
        await db.collection('Users').updateOne({Username:user},{$set:{Password:newpass}},{upsert:true});
    }
}