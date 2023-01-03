const userM = require('../model/Users.m');
const doctorM = require('../model/Doctors.m');
const CryptoJS = require('crypto-js');
const RecordsM = require('../model/Records.m');
const AppointmentM = require('../model/Appointment.m');
const hashLength = 64;
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
exports.render = async (req, res, next) => {
    try {
        if (req.session.Username) {
            if (!req.session.Doctor) {
                const rs = await userM.getByUsername(req.session.Username);
                var u = rs[0];
                u.src = 'img/';
                if (u.Gender == 'Nữ') {
                    u.src += 'female.png';
                    u.female = 'checked';
                }
                else {
                    u.src += 'male.png';
                    u.male = 'checked';
                }
                u.DOBB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('fr-CA') : "";
                u.DOB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('vi-VN') : "";
                const records=await RecordsM.getByUsername(req.session.Username);
                const appointments=await AppointmentM.getByUsername(req.session.Username);
                for (let i=0;i<appointments.length;i++) {
                    appointments[i].Date = typeof appointments[i].Date == "object" ? appointments[i].Date.toLocaleDateString('vi-VN') : "";
                }
                res.render('profile', { u: u, uu: u, display1: "d-none", display2: "d-block", editSuccess: "d-none", editNoSuccess: "d-none", changePasswordSuccess: "d-none", changePasswordNoSuccess: "d-none",records:records, appointments:appointments, role:"patient"});
            }
            else {
                const rs = await doctorM.getByUsername(req.session.Username);
                const appointments=await AppointmentM.getByID(rs[0].ID);
                for (let i=0;i<appointments.length;i++) {
                    appointments[i].Date = typeof appointments[i].Date == "object" ? appointments[i].Date.toLocaleDateString('vi-VN') : "";
                }
                rs[0].href = 'https://www.google.com/search?q=' + rs[0].Title + ' ' + rs[0].Name;
                if (rs[0].schedule==undefined) rs[0].error="empty";
                res.render('detailDoctor', { data: rs[0], display1: "d-none", display2: "d-block",role:"doctor", appointments:appointments, username:req.session.Username});
            }
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
                            u.female = 'checked';
                        }
                        else {
                            u.src += 'male.png';
                            u.male = 'checked';
                        }
                        u.DOBB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('fr-CA') : "";
                        u.DOB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('vi-VN') : "";
                        req.session.Username = user.Username;
                        return res.render('profile', { u: u, uu: u, display1: "d-none", display2: "d-block", editSuccess: "d-block", editNoSuccess: "d-none", changePasswordSuccess: "d-none", changePasswordNoSuccess: "d-none" });
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
                        if (user.Gender == "Nữ") {
                            user.female = 'checked';
                        }
                        else {
                            user.male = 'checked';
                        }
                        user.DOBB = typeof user.DOB == "object" ? user.DOB.toLocaleDateString('fr-CA') : "";
                        u.DOB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('vi-VN') : "";
                        return res.render('profile', { u: u, uu: user, display1: "d-none", display2: "d-block", editSuccess: "d-none", editNoSuccess: "d-block", changePasswordSuccess: "d-none", changePasswordNoSuccess: "d-none" });
                    }
                })
            }
            if (user.Password != null) {
                u = oldUser[0];
                u.src = 'img/';
                if (u.Gender == 'Nữ') {
                    u.src += 'female.png';
                    u.female = 'checked';
                }
                else {
                    u.src += 'male.png';
                    u.male = 'checked';
                }
                u.DOBB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('fr-CA') : "";
                u.DOB = typeof u.DOB == "object" ? u.DOB.toLocaleDateString('vi-VN') : "";
                const pwDb = u.Password;
                const salt = pwDb.slice(hashLength);
                const pwSalt = user.NewPassword + salt;
                const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
                if (pwDb !== (pwHashed + salt)) {
                    return res.render('profile', { u: u, uu: u, user: user, display1: "d-none", display2: "d-block", editSuccess: "d-none", editNoSuccess: "d-none", changePasswordSuccess: "d-none", changePasswordNoSuccess: "d-block" });
                }
                else {
                    const pw = user.Password;
                    const salt = Date.now().toString(16);
                    const pwSalt = pw + salt;
                    const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
                    user.Password = pwHashed + salt;
                    await userM.changePassword(req.session.Username, user.Password);
                    return res.render('profile', { u: u, uu: u, display1: "d-none", display2: "d-block", editSuccess: "d-none", editNoSuccess: "d-none", changePasswordSuccess: "d-block", changePasswordNoSuccess: "d-none" });
                }
            }
        }
        else {
            res.redirect('/dang-nhap')
        }
    } catch (err) {
        next(err);
    }
}