const app=require('express');
const router=app.Router();
const searchC=require('../controllers/search.c');
router.use('/thuoc',searchC.viewAllDrugs);
router.use('/bac-si',searchC.viewAllDoctors);
router.use('/dich-vu',searchC.viewAllServices);
module.exports=router;