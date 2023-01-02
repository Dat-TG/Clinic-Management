const drugM = require('../model/Drugs.m');
exports.viewDetail = async (req, res, next) => {
    try {
        let role = "patient";
        if (req.session.Doctor) {
            role = "doctor";
        }
        var Name = req.params.Name;
        var ID=Name.split("-")[0];
        Name=Name.split("-")[1];
        const rs = await drugM.getByID(ID);
        if (rs.length==0) {
            if (req.session.Username) {
                var info="";
                if (req.session.delete) {
                    info="delete";
                    delete req.session.delete;
                }
                return res.render('page-not-found', { display1: "d-none", display2: "d-block", role: role, info:info});
            }
            else {
                var info="";
                if (req.session.delete) {
                    info="delete";
                    delete req.session.delete;
                }
                return res.render('page-not-found', { display1: "d-block", display2: "d-none", role: role, info:info });
            }
        }
        rs[0].href = 'https://www.google.com/search?tbm=isch&q=' + rs[0].Name;
        rs[0].shop = 'https://www.google.com/search?tbm=shop&q=' + rs[0].Name;
        if (req.session.Username) {
            return res.render('detailDrug', { data: rs[0], display1: "d-none", display2: "d-block", role: role });
        }
        else {
            return res.render('detailDrug', { data: rs[0], display1: "d-block", display2: "d-none", role: role });
        }
    } catch (err) {
        next(err);
    }
}