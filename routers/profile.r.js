const app=require('express');
const router=app.Router();
const profileC=require('../controllers/profile.c');
router.get('/',profileC.render);
router.post('/',profileC.postProfile);
module.exports=router;