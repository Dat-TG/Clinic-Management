const app=require('express');
const router=app.Router();
const loginC=require('../controllers/login.c');
router.get('/',loginC.render);
router.post('/', loginC.check);
module.exports=router;