const drugM = require('../model/Drugs.m');
const doctorM = require('../model/Doctors.m');
const serviceM = require('../model/Services.m');
const userM = require('../model/Users.m');
const RecordsM = require('../model/Records.m');
exports.viewAllDrugs = async (req, res, next) => {
    try {
        const rs = await drugM.getAll();
        let role = "patient";
        if (req.session.Doctor) {
            role = "doctor";
        }
        if (req.session.Username) {
            res.render('search-drug', { drugs: rs, display1: "d-none", display2: "d-block", role: role });
        }
        else {
            res.render('search-drug', { drugs: rs, display1: "d-block", display2: "d-none", role: role });
        }
    } catch (err) {
        next(err);
    }
}
exports.viewAllDoctors = async (req, res, next) => {
    try {
        const rs = await doctorM.getAll();
        let role = "patient";
        if (req.session.Doctor) {
            role = "doctor";
        }
        if (req.session.Username) {
            res.render('search-doctor', { doctors: rs, display1: "d-none", display2: "d-block", role: role });
        }
        else {
            res.render('search-doctor', { doctors: rs, display1: "d-block", display2: "d-none", role: role });
        }
    } catch (err) {
        next(err);
    }
}
exports.viewAllServices = async (req, res, next) => {
    try {
        const rs = await serviceM.getAll();
        let role = "patient";
        if (req.session.Doctor) {
            role = "doctor";
        }
        var info="";
        if (req.session.info) {
            info=req.session.info;
            delete req.session.info;
        }
        if (req.session.Username) {
            res.render('search-service', { services: rs, display1: "d-none", display2: "d-block", role: role, info:info });
        }
        else {
            res.render('search-service', { services: rs, display1: "d-block", display2: "d-none", role: role });
        }
    } catch (err) {
        next(err);
    }
}
exports.viewAllPatients = async (req, res, next) => {
    try {
        const rs = await userM.getAll();
        let role = "patient";
        if (req.session.Doctor) {
            role = "doctor";
        }
        for (let i = 0; i < rs.length; i++) {
            rs[i].DOB = typeof rs[i].DOB == "object" ? rs[i].DOB.toLocaleDateString('vi-VN') : "";
        }
        if (req.session.Username && req.session.Doctor) {
            res.render('search-patient', { patients: rs, display1: "d-none", display2: "d-block", role: role });
        }
        else {
            res.render('error', { patients: rs, display1: "d-block", display2: "d-none", role: role });
        }
    } catch (err) {
        next(err);
    }
}
exports.viewAllRecords=async (req, res, next) => {
    try {
        const rs = await RecordsM.getAll();
        let role = "patient";
        if (req.session.Doctor) {
            role = "doctor";
        }
        if (req.session.Username && req.session.Doctor) {
            res.render('search-record', { records:rs, display1: "d-none", display2: "d-block", role: role });
        }
        else {
            res.render('error', { display1: "d-block", display2: "d-none", role: role });
        }
    } catch (err) {
        next(err);
    }
}