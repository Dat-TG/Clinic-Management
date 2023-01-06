const DoctorsM = require('../model/Doctors.m');
const UsersM = require('../model/Users.m');
const DrugsM = require('../model/Drugs.m');
const ServicesM = require('../model/Services.m');
const RecordsM = require('../model/Records.m');
const AppointmentM = require('../model/Appointment.m');
const PatientsInDayM = require('../model/PatientsInDay.m');
const RevenueM = require('../model/Revenue.m');
const DrugReportM = require('../model/Drug-Report.m');
exports.createInvoice = async (req, res, next) => {
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Doctor) {
        if (req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
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
            services[i].Quantity=1;
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
    if (data.Patient || data.Name) {
        const rs=await RecordsM.getMaxID();
        if (rs.length==0) {
            data.ID="1";
        }
        else {
            var ID=parseInt(parseInt(rs[0].ID)+1);
            data.ID=ID.toString();
        }
        await RecordsM.add(data);
        return res.redirect('/tai-lieu/ho-so-benh-an/'+ID);
    }
    res.send({ user: user[0], drug: drug[0] });
}
exports.getAppointment=async (req,res,next)=>{
    try {
        const doctors=await DoctorsM.getAll();
        let role = "patient";
        if (req.session.Doctor) {
            role = "doctor";
        }
        if (req.session.Doctor) {
            res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        if (req.session.Username) {
            const user=await UsersM.getByUsername(req.session.Username);
            user[0].DOB = typeof user[0].DOB == "object" ? user[0].DOB.toLocaleDateString('fr-CA') : "";
            res.render('appointment', { doctors:doctors, user:user[0],display1: "d-none", display2: "d-block", role: role });
        }
        else {
            res.render('appointment', { doctors:doctors, display1: "d-block", display2: "d-none", role: role });
        }
    } catch (err) {
        next(err);
    }
}
exports.postAppointment=async (req,res,next)=>{
    try {
        req.body.Doctor=JSON.parse(req.body.Doctor);
        req.body.Status="Đang chờ";
        req.body.Date=new Date(req.body.Date);
        await AppointmentM.add(req.body);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
}
exports.changeStatus=async(req,res,next)=>{
    try {
        const rs=await AppointmentM.changeStatus(req.body.ID, req.body.Status);
        res.send('updated');
    } catch (err) {
        next(err);
    }
}
exports.getPatientsListInDay=async(req,res,next)=>{
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Doctor) {
        if (req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
    }
    try {
        //const rs=await AppointmentM.changeStatus(req.body.ID, req.body.Status);
        var patients = await UsersM.getAll();
        var today=new Date();
        today = typeof today == "object" ? today.toLocaleDateString('vi-VN') : "";
        var list=await PatientsInDayM.getAll();
        res.render('patients-list-in-day', {patients:patients, display1: "d-none", display2: "d-block", role: role, today:today, list:list});
    } catch (err) {
        next(err);
    }
}
exports.postPatientsListInDay=async(req,res,next)=>{
    try {
        const data=req.body;
        if (data.username) {
            const rs=await UsersM.getByUsername(data.username);
            rs[0].DOB = typeof rs[0].DOB == "object" ? rs[0].DOB.toLocaleDateString('vi-VN') : "";
            return res.send({user:rs[0]});
        } else {
            await PatientsInDayM.deleteAll();
            for (let i=0;i<data.PatientsList.length;i++) {
                let rs=await PatientsInDayM.add(data.PatientsList[i]);
            }
        }
    } catch (err) {
        next(err);
    }
}
exports.getRevenue=async(req,res,next)=>{
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Doctor) {
        if (req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
    }
    try {
        res.render('revenue', {display1: "d-none", display2: "d-block", role: role});
    } catch (err) {
        next(err);
    }
}
exports.postRevenue=async(req,res,next)=>{
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Doctor) {
        if (req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
    }
    try {
        var data=req.body;
        data.date=new Date();
        data.date=data.date.toLocaleString('vi-VN');
        data.author=await DoctorsM.getByUsername(req.session.Username);
        data.author=data.author[0];
        const rs=await RevenueM.add(data);
        res.redirect('/tai-lieu/xem-bao-cao-doanh-thu');
    } catch (err) {
        next(err);
    }
}
exports.viewAllRevenue=async(req,res,next)=>{
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Doctor) {
        if (req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
    }
    try {
        const rs=await RevenueM.getAll();
        res.render('revenue-list', { revenues:rs,display1: "d-none", display2: "d-block", role: role });
    } catch (err) {
        next(err);
    }
}
exports.viewRevenueDetail=async(req,res,next)=>{
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Doctor) {
        if (req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
    }
    try {
        const rs=await RevenueM.getByID(req.params.ID);
        res.render('revenue-detail', { data:rs[0],display1: "d-none", display2: "d-block", role: role });
    } catch (err) {
        next(err);
    }
}
exports.getDrugReport=async(req,res,next)=>{
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Doctor) {
        if (req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
    }
    try {
        const drugs=await DrugsM.getAll();
        res.render('drug-report', {drugs:drugs,display1: "d-none", display2: "d-block", role: role});
    } catch (err) {
        next(err);
    }
}
exports.postDrugReport=async(req,res,next)=>{
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Doctor) {
        if (req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
    }
    try {
        var data=req.body;
        data.date=new Date();
        data.date=data.date.toLocaleString('vi-VN');
        data.author=await DoctorsM.getByUsername(req.session.Username);
        data.author=data.author[0];
        const rs=await DrugReportM.add(data);
        res.redirect('/tai-lieu/xem-bao-cao-thuoc');
    } catch (err) {
        next(err);
    }
}
exports.viewAllDrugReports=async(req,res,next)=>{
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Doctor) {
        if (req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
    }
    try {
        const rs=await DrugReportM.getAll();
        res.render('drug-report-list', { reports:rs,display1: "d-none", display2: "d-block", role: role });
    } catch (err) {
        next(err);
    }
}
exports.viewDrugReportDetail=async(req,res,next)=>{
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Doctor) {
        if (req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
    }
    try {
        const rs=await DrugReportM.getByID(req.params.ID);
        const drugs=await DrugsM.getAll();
        var array=[];
        let i=0;
        while (true) {
            i++;
            if (rs[0]['Name'+i]!=undefined) {
                array.push({
                    Name: rs[0]['Name'+i],
                    Unit: rs[0]['Unit'+i],
                    Quantity: rs[0]['Quantity'+i],
                    Used: rs[0]['Used'+i],
                });
            }
            else {
                break;
            }
        }
        res.render('drug-report-detail', { drugs:drugs,thang:rs[0].thang,nam:rs[0].nam,data:array,display1: "d-none", display2: "d-block", role: role });
    } catch (err) {
        next(err);
    }
}
exports.viewRecordDetail=async(req,res,next)=>{
    let role = "patient";
    if (req.session.Doctor) {
        role = "doctor";
    }
    if (!req.session.Username) {
        return res.render('error', { display1: "d-block", display2: "d-none", role: role });
    }
    try {
        const rs=await RecordsM.getByID(req.params.ID);
        if (!req.session.Doctor && rs[0].Username!=req.session.Username) {
            return res.render('error', { display1: "d-none", display2: "d-block", role: role });
        }
        var array=[];
        let i=0;
        while (true) {
            i++;
            if (rs[0]['Name'+i]!=undefined) {
                array.push({
                    Name: rs[0]['Name'+i],
                    Unit: rs[0]['Unit'+i],
                    Quantity: rs[0]['Quantity'+i],
                    Price: rs[0]['Price'+i],
                    Total: rs[0]['Total'+i]
                });
            }
            else {
                break;
            }
        }
        res.render('record-detail', {data:rs[0],drugs:array,display1: "d-none", display2: "d-block", role: role });
    } catch (err) {
        next(err);
    }
}