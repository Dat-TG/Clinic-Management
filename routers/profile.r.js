const app=require('express');
const router=app.Router();
const profileC=require('../controllers/profile.c');
router.use('/',profileC.render);
module.exports=router;