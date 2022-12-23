const DoctorsM = require('../model/Doctors.m');
const UsersM = require('../model/Users.m');
const DrugsM=require('../model/Drugs.m');
exports.createInvoice=async(req,res,next)=>{
    /*if (!req.session.Username) {
        res.redirect('/dang-nhap');
    }
    else {*/
        const patients=await UsersM.getAll();
        const doctor=await DoctorsM.getByUsername(req.session.Username);
        var today=new Date();
        today=typeof today == "object" ? today.toLocaleString('vi-VN') : "";
        const drugs=await DrugsM.getAll();
        res.render('invoice',{patients:patients,doctor:doctor[0], today:today, drugs:drugs});
}
exports.UpdateInvoice=async(req,res,next)=>{
    const data=req.body;
    const user=await UsersM.getByUsername(data.username);
    const drug=await DrugsM.getByName(data.name);
    if (user.length>0) {
        user[0].DOB=typeof user[0].DOB == "object" ? user[0].DOB.toLocaleDateString('vi-VN') : "";
    }
    res.send({user:user[0],drug:drug[0]});
}