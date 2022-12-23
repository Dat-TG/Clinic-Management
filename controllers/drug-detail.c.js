const drugM = require('../model/Drugs.m');
exports.viewDetail = async (req, res, next) => {
    try {
        var Name = req.params.Name;
        const rs = await drugM.getByName(Name);
        rs[0].href = 'https://www.google.com/search?tbm=isch&q=' + rs[0].Name;
        rs[0].shop = 'https://www.google.com/search?tbm=shop&q=' + rs[0].Name;
        let role = "patient";
        if (req.session.Doctor) {
            role = "doctor";
        }
        if (req.session.Username) {
            res.render('detailDrug', { data: rs[0], display1: "d-none", display2: "d-block", role: role });
        }
        else {
            res.render('detailDrug', { data: rs[0], display1: "d-block", display2: "d-none", role: role });
        }
    } catch (err) {
        next(err);
    }
}