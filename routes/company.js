const express = require('express');
const companycontroller = require('../controllers/company');
const isauth = require('../midlleware/company-is-auth');
const router = express.Router();

router.get('/', isauth, companycontroller.gethome);
router.get('/other-companies', isauth, companycontroller.getothercompanies)
router.get('/all-resume', isauth, companycontroller.getallresume);
router.get('/all-resume/:studentId', isauth, companycontroller.getStudentResume);
router.get('/select-student/:studentId', isauth, companycontroller.postSelectedStudent);
router.get('/selected-students', isauth, companycontroller.getSelectedStudent);
module.exports = router;
