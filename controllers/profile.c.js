const userM = require('../model/Users.m');
exports.render = async (req, res, next) => {
    try {
        if (req.session.Username) {
            const rs = await userM.getByUsername(req.session.Username);
            var u = rs[0];
            u.src = 'img/';
            if (u.Gender == 'Nữ') {
                u.src += 'female.png';
            }
            else {
                u.src += 'male.png';
            }
            u.DOB=typeof u.DOB == "object" ? u.DOB.toLocaleDateString('pt-PT') : "";
            res.render('profile', { u: u, display1: "d-none", display2: "d-block" });
        }
        else {
            res.redirect('/dang-nhap')
        }
    } catch (err) {
        next(err);
    }
}