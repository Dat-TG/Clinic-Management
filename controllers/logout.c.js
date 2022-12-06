exports.logout=async(req, res, next)=>{
    try {
        req.session.Username=null;
        res.redirect('/dang-nhap');
    } catch (err) {
        next(err);
    }
}