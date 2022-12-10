const userM = require('../model/Users.m');
const alert = require('alert');
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
exports.render = async (req, res, next) => {
    try {
        if (req.session.Username) {
            const rs = await userM.getByUsername(req.session.Username);
            var u = rs[0];
            u.src = 'img/';
            if (u.Gender == 'Nữ') {
                u.src += 'female.png';
                u.female='checked';
            }
            else {
                u.src += 'male.png';
                u.male='checked';
            }
            u.DOBB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('fr-CA') : "";
            u.DOB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('pt-PT') : "";
            res.render('profile', { u: u, uu: u, display1: "d-none", display2: "d-block", editSuccess: "d-none", editNoSuccess: "d-none" });
        }
        else {
            res.redirect('/dang-nhap')
        }
    } catch (err) {
        next(err);
    }
}
exports.postProfile = async (req, res, next) => {
    try {
        if (req.session.Username) {
            var oldUser = await userM.getByUsername(req.session.Username);
            var user = req.body;
            user.DOB = new Date(user.DOB);
            if (user.Username != null) {
                userM.getByUsername(user.Username).then(async (rs) => {
                    if (rs.length == 0 || user.Username == req.session.Username) {
                        await userM.update(req.session.Username, user);
                        var u = user;
                        u.src = 'img/';
                        if (u.Gender == 'Nữ') {
                            u.src += 'female.png';
                            u.female='checked';
                        }
                        else {
                            u.src += 'male.png';
                            u.male='checked';
                        }
                        u.DOBB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('fr-CA') : "";
                        u.DOB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('pt-PT') : "";
                        req.session.Username = user.Username;
                        return res.render('profile', { u: u, uu: u, display1: "d-none", display2: "d-block", editSuccess: "d-block", editNoSuccess: "d-none" });
                    }
                    else {
                        var u = oldUser[0];
                        u.src = 'img/';
                        if (u.Gender == 'Nữ') {
                            u.src += 'female.png';
                        }
                        else {
                            u.src += 'male.png';
                        }
                        if (user.Gender=="Nữ") {
                            user.female='checked';
                        }
                        else {
                            user.male='checked';
                        }
                        user.DOBB = typeof user.DOB == "object" ? user.DOB.toLocaleDateString('fr-CA') : "";
                        u.DOB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('pt-PT') : "";
                        return res.render('profile', { u: u, uu: user, display1: "d-none", display2: "d-block", editSuccess: "d-none", editNoSuccess: "d-block" });
                    }
                })
            }
        }
        else {
            res.redirect('/dang-nhap')
        }
    } catch (err) {
        next(err);
    }
}