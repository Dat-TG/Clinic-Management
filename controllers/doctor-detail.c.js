const doctorM = require('../model/Doctors.m');
exports.viewDetail = async (req, res, next) => {
    try {
        var ID_Name = req.params.Name;
        var ID = ID_Name.split("-");
        const rs = await doctorM.getByID(ID[0]);
        rs[0].href = 'https://www.google.com/search?q=' + rs[0].Title + ' ' + rs[0].Name;
        if (rs[0].schedule==undefined) rs[0].error="empty";
        let role = "patient";
        if (req.session.Doctor) {
            role = "doctor";
        }
        if (req.session.Username) {
            res.render('detailDoctor', { data: rs[0], display1: "d-none", display2: "d-block", role:role, username:req.session.Username});
        }
        else {
            res.render('detailDoctor', { data: rs[0], display1: "d-block", display2: "d-none", role:role});
        }
    } catch (err) {
        next(err);
    }
}