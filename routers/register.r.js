const app=require('express');
const router=app.Router();
const registerC=require('../controllers/register.c');
router.get('/',registerC.render);
router.post('/', registerC.writeDB);
module.exports=router;