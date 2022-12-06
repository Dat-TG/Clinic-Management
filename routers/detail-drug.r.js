const app=require('express');
const router=app.Router();
const detailC=require('../controllers/drug-detail.c');
router.use('/:Name',detailC.viewDetail).post(detailC.viewDetail);
module.exports=router;