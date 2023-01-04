exports.logout=async(req, res, next)=>{
    try {
        delete req.session.Username;
        delete req.session.Name;
        delete req.session.Doctor;
        res.redirect('/dang-nhap');
    } catch (err) {
        next(err);
    }
}