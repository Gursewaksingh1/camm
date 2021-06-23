const express = require('express');
const admincontroller = require('../controllers/admin');
const isauth = require('../midlleware/admin-is-auth');
const { body } = require('express-validator/check');
const router = express.Router();

router.get('/', isauth, admincontroller.adminhomepage)
router.get('/all-students', isauth, admincontroller.getallstudents);
router.get('/edit-student/:studentid',  isauth, admincontroller.geteditstudent);
router.post('/edit-student', isauth,[
    body('name', 'name must be an alphabatic and constin 5 charcater').isString().isLength({min: 5}).trim(),
    body('email','must use email structure in email box').isEmail(),
    body('stream', 'write your stream only in alphabatically like BCA').trim().isString().isLength({min: 1}),
   body('inWhichYear', 'must write your year of college like 2017 or ').trim().isString().isLength({min: 1})
    ], admincontroller.posteditstudent);
router.post('/delete-student', isauth, admincontroller.postdeletestudent);

router.get('/addcompany', isauth, admincontroller.getaddcompany)
router.post('/addcompany',[
    body('nameOfCompany', 'must write company name and use atleast 5 characters').isString().trim().isLength({min: 5}),
    body('email', 'must use email structure').isEmail(),
    body('password', 'password must be 8 characters long').isLength({min: 8}).trim(),
    body('ownerName', 'must write owner name and use atleast 3 characters').isString().trim().isLength({min: 3}),
    body('aboutCompany', 'aboutCompany box should contain 20 character').isLength({min: 20}).trim().isString(),
], isauth, admincontroller.postaddcompany)

router.get('/all-companies', isauth, admincontroller.getallcompanies);

router.get('/edit-company/:companyid', isauth, admincontroller.geteditcompany)
router.post('/edit-company',[
    body('nameOfCompany', 'must write company name and use atleast 5 characters').isString().trim().isLength({min: 5}),
    body('email', 'must use email structure').isEmail(),
    body('ownerName', 'must write owner name and use atleast 3 characters').isString().trim().isLength({min: 3}),
    body('aboutCompany', 'aboutCompany box should contain 20 character').trim().isString().isLength({min: 20}),
], isauth, admincontroller.posteditcompany)

router.post('/delete-company', isauth, admincontroller.postdeletecompany)

router.get('/all-admin', admincontroller.getalladmin);
router.post('/delete-admin', admincontroller.postdeleteadmin);
router.get('/add-admin', isauth, admincontroller.getaddadmin);
router.post('/add-admin', [
    body('name', 'admin name must be written in five character').isString().isLength({min: 5}).trim(),
    body('email', 'email must be in proper structure').isEmail(),
    body('password', 'password must contain 5 characters').trim().isLength({min: 5 }),
    body('sinceInCompany', 'only contain date value in (mm/dd/year) format at sinceInCompany box').trim().isDate(),
    body('contactNo', 'only contain numeric value and must contain 10 numbers').isNumeric().trim().isLength({min: 10, max: 10 }),
    body('address', 'admin address must be written in least 20 character').isString().isLength({min: 20}).trim(),
], isauth, admincontroller.postaddadmin);
module.exports = router;
