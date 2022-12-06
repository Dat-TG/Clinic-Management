const app=require('express');
const router=app.Router();
const logoutC=require('../controllers/logout.c');
router.use('/',logoutC.logout);
module.exports=router;