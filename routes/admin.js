const express = require('express');
const admincontroller = require('../controllers/admin');
const isauth = require('../midlleware/admin-is-auth');
const { body } = require('express-validator/check');
const router = express.Router();

router.get('/', isauth, admincontroller.adminhomepage)
router.get('/all-students', isauth, admincontroller.getallstudents);
router.get('/edit-student/:studentid',  isauth, admincontroller.geteditstudent);
router.post('/edit-student', isauth,[
    body('name').notEmpty().isString().isLength({ min: 5 }).trim().withMessage('name should be a string and also hold min 5 character'),
    body('email').isEmail().withMessage('must write email structure'),
    body('password').notEmpty().trim().isLength({min: 5, max: 30}).withMessage('password must contain atleast five character'),
    body('stream').notEmpty().isString().isLength({ min: 5}).trim().withMessage('write your stream in words'),
   body('inWhichYear').notEmpty().trim().isString().withMessage('must write your year of college') ], admincontroller.posteditstudent);
router.post('/delete-student', isauth, admincontroller.postdeletestudent);

router.get('/addcompany', isauth, admincontroller.getaddcompany)
router.post('/addcompany',[
    body('nameOfCompany').notEmpty().isString().trim().isLength({min: 5}).withMessage('must write company name and use atleast 5 characters'),
    body('email').isEmail().withMessage('must use email structure'),
    body('password').notEmpty().isLength({min: 5}).trim().withMessage('password must be 5 characters long'),
    body('ownerName').notEmpty().isString().trim().isLength({min: 5}).withMessage('must write owner name and use atleast 5 characters'),
    
], isauth, admincontroller.postaddcompany)

router.get('/all-companies', isauth, admincontroller.getallcompanies);

router.get('/edit-company/:companyid', isauth, admincontroller.geteditcompany)
router.post('/edit-company',[
    body('nameOfCompany').notEmpty().isString().trim().isLength({min: 5}).withMessage('must write company name and use atleast 5 characters'),
    body('email').isEmail().withMessage('must use email structure'),
    body('password').notEmpty().isLength({min: 5}).trim().withMessage('password must be 5 characters long'),
    body('ownerName').notEmpty().isString().trim().isLength({min: 5}).withMessage('must write owner name and use atleast 5 characters'),
    
], isauth, admincontroller.posteditcompany)

router.post('/delete-company', isauth, admincontroller.postdeletecompany)

router.get('/all-admin', admincontroller.getalladmin);
router.post('/delete-admin', admincontroller.postdeleteadmin);
router.get('/add-admin', isauth, admincontroller.getaddadmin);
router.post('/add-admin', [
    body('name').isString().notEmpty().isLength({min: 5}).trim().withMessage('admin name must be written in five character'),
    body('email').isEmail().notEmpty().withMessage('email must be in proper structure'),
    body('password').trim().notEmpty().isLength({min: 5 }).withMessage('password must contain 5 characters'),
    body('sinceInCompany').notEmpty().trim().isNumeric().withMessage('only contain numeric value'),
    body('contactNo').isNumeric().notEmpty().trim().isLength({min: 10, max: 10 }).withMessage('only contain numeric value and must contain 10 numbers'),
    body('address').isString().notEmpty().isLength({min: 20}).trim().withMessage('admin address must be written in least 20 character'),
], isauth, admincontroller.postaddadmin);
module.exports = router;
