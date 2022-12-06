const app=require('express');
const router=app.Router();
const searchC=require('../controllers/search.c');
router.use('/thuoc',searchC.viewAll);
module.exports=router;