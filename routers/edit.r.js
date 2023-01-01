const app=require('express');
const router=app.Router();
const editC=require('../controllers/edit.c');
router.get('/thuoc-dich-vu',editC.getEditDrugService);
router.post('/thuoc/:ID',editC.postEditDrug);
module.exports=router;