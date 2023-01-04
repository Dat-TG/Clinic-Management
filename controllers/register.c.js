const userM=require('../model/Users.m');
const CryptoJS=require('crypto-js');
const hashLength=64;
exports.render= async(req, res, next) =>{
    try {
        res.render('register', {display:"d-none",display1:"d-block",display2:"d-none"});
    } catch(err) {
        next(err);
    }
}
exports.writeDB=async(req, res, next)=>{
    if (req.session.Username) {
        return res.redirect('/tai-khoan');
    }
    try {
        var user=req.body;
        const pw=user.Password;
        const salt=Date.now().toString(16);
        const pwSalt=pw+salt;
        const pwHashed=CryptoJS.SHA3(pwSalt, {outputLength:hashLength*4}).toString(CryptoJS.enc.Hex);
        user.Password=pwHashed+salt;
        const rs=await userM.getMaxID();
        if (rs.length==0) {
            user.ID="1";
        }
        else {
            var ID=parseInt(parseInt(rs[0].ID)+1);
            user.ID=ID.toString();
        }
        user.DOB=new Date(user.DOB);
        userM.getByUsername(user.Username).then(rs=>{
            if (rs.length==0) {
                userM.add(user);
                res.redirect('/dang-nhap');
            }
            else {
                user.Password=pw;
                res.render('register',{user:user, display: "block",display1:"d-block",display2:"d-none", role:"patient"});
            }
        })
    } catch(err) {
        next(err);
    }
};