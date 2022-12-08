const drugM=require('../model/Drugs.m');
const doctorM=require('../model/Doctors.m');
exports.viewAllDrugs=async(req, res, next)=>{
    try {
        const rs=await drugM.getAll();
        if (req.session.Username) {
            res.render('search-drug',{drugs:rs, display1: "d-none", display2: "d-block"});
        }
        else {
            res.render('search-drug',{drugs:rs, display1: "d-block", display2: "d-none"});
        }
    } catch (err) {
        next(err);
    }
}
exports.viewAllDoctors=async(req, res, next)=>{
    try {
        const rs=await doctorM.getAll();
        if (req.session.Username) {
            res.render('search-doctor',{doctors:rs, display1: "d-none", display2: "d-block"});
        }
        else {
            res.render('search-doctor',{doctors:rs, display1: "d-block", display2: "d-none"});
        }
    } catch (err) {
        next(err);
    }
}