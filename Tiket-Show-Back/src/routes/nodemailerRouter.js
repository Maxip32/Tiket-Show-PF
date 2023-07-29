const {Router} = require('express');
const {sendEmail} = require("../controllers/userControllers/Mailer")


const router = Router()



router.post('/mail', sendEmail)



module.exports = router