const DoctorsM = require('../model/Doctors.m');
const UsersM = require('../model/Users.m');
const DrugsM = require('../model/Drugs.m');
const ServicesM = require('../model/Services.m');
const RecordsM = require('../model/Records.m');
exports.createInvoice = async (req, res, next) => {
    if (!req.session.Doctor) {
        res.redirect('/');
    }
    else {
        const patients = await UsersM.getAll();
        const doctor = await DoctorsM.getByUsername(req.session.Username);
        var today = new Date();
        var date=typeof today == "object" ? today.toLocaleDateString('vi-VN') : "";
        var time=typeof today=="object"?today.toLocaleTimeString('vi-VN') : "";
        today = typeof today == "object" ? today.toLocaleString('vi-VN') : "";
        const drugs = await DrugsM.getAll();
        const services = await ServicesM.getAll();
        for (let i = 0; i < services.length; i++) {
            services[i].Name = services[i].ServiceName;
            services[i].Unit = "Dịch vụ";
            drugs.push(services[i]);
        }
        res.render('invoice', { patients: patients, doctor: doctor[0], today: today, drugs: drugs,date:date,time:time, display1:"d-none",display2:"d-block", role:"doctor"});
    }
}
exports.UpdateInvoice = async (req, res, next) => {
    const data = req.body;
    const user = await UsersM.getByUsername(data.username);
    var drug = await DrugsM.getByName(data.name);
    if (drug.length == 0) {
        drug = await ServicesM.getByName(data.name);
        if (drug.length > 0) {
            drug[0].Name = drug[0].ServiceName;
            drug[0].Unit = "Dịch vụ";
        }
    }
    if (user.length > 0) {
        user[0].DOB = typeof user[0].DOB == "object" ? user[0].DOB.toLocaleDateString('vi-VN') : "";
    }
    if (data.Patient) {
        const rs=await RecordsM.getMaxID();
        if (rs.length==0) {
            data.ID="1";
        }
        else {
            var ID=parseInt(parseInt(rs[0].ID)+1);
            data.ID=ID.toString();
        }
        await RecordsM.add(data);
    }
    res.send({ user: user[0], drug: drug[0] });
}