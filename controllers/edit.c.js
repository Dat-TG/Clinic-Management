const DrugsM = require("../model/Drugs.m");
const ServicesM = require("../model/Services.m");

exports.getEditDrugService=async(req,res,next)=>{
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
        res.render('editInstruction', { display1: "d-none", display2: "d-block", role: role });
    } catch (err) {
        next(err);
    }
}
exports.postEditDrug=async(req,res,next)=>{
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
        var ID=req.params.ID;
        var data=req.body;
        data.ID=ID;
        await DrugsM.update(ID, data);
        const rs = await DrugsM.getByID(ID);
        if (rs.length==0) {
            if (req.session.Username) {
                return res.render('page-not-found', { display1: "d-none", display2: "d-block", role: role });
            }
            else {
                return res.render('page-not-found', { display1: "d-block", display2: "d-none", role: role });
            }
        }
        rs[0].href = 'https://www.google.com/search?tbm=isch&q=' + rs[0].Name;
        rs[0].shop = 'https://www.google.com/search?tbm=shop&q=' + rs[0].Name;
        return res.render('detailDrug', { data: rs[0], display1: "d-none", display2: "d-block", role: role, info:"edit" });

    } catch (err) {
        next(err);
    }
}
exports.deleteDrug=async(req,res,next)=>{
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
        var Name = req.params.Name;
        var ID=Name.split("-")[0];
        Name=Name.split("-")[1];
        await DrugsM.delete(ID);
        req.session.delete="delete";
        return res.redirect('/thuoc/'+ID+"-"+Name);

    } catch (err) {
        next(err);
    }
}
exports.postEditService=async(req,res,next)=>{
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
        var ID=req.params.ID;
        var data=req.body;
        data.ID=ID;
        await ServicesM.update(ID, data);
        req.session.info="edit";
        res.redirect('/tim-kiem/dich-vu');
    } catch (err) {
        next(err);
    }
}
exports.deleteService=async(req,res,next)=>{
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
        var ID = req.params.ID;
        await ServicesM.delete(ID);
        req.session.info="delete";
        res.redirect('/tim-kiem/dich-vu');
    } catch (err) {
        next(err);
    }
}