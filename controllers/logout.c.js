exports.logout=async(req, res, next)=>{
    try {
        req.session.Username=null;
        req.session.Doctor=null;
        res.redirect('/dang-nhap');
    } catch (err) {
        next(err);
    }
}