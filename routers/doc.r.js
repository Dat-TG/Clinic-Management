const app=require('express');
const router=app.Router();
const docC=require('../controllers/doc.c');
router.get('/xuat-hoa-don',docC.createInvoice);
router.post('/xuat-hoa-don', docC.UpdateInvoice);
module.exports=router;