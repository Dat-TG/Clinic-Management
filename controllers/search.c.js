const drugM=require('../model/Drugs.m');
exports.viewAll=async(req, res, next)=>{
    try {
        const rs=await drugM.getAll();
        res.render('search-drug',{drugs:rs});
    } catch (err) {
        next(err);
    }
}