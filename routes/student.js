const express = require('express');
const studentcontroller = require('../controllers/student');
const isauth = require('../midlleware/student-is-auth');
const { body }  = require('express-validator/check');
const router = express.Router();

router.get('/addstudent', studentcontroller.getaddstudent);
router.post('/addstudent',[
    body('name').isString().isLength({ min: 5 }).trim().withMessage('name should be a string and also hold min 5 character'),
    body('email').isEmail(),
    body('password').trim().isLength({min: 5, max: 30}).withMessage('password must contain atleast five character'),
    body('stream').trim().isString().withMessage('write your stream in words'),
   body('inWhichYear').trim().isAlphanumeric().withMessage('must write your year of college') ], studentcontroller.postaddstudent)

router.get('/', isauth, studentcontroller.gethome);

router.get('/student-detail', isauth, studentcontroller.getstudentdetail);
router.post('/student-detail', isauth, studentcontroller.poststudentdetail);

router.get('/add-resume', isauth, studentcontroller.getaddresume)
router.post('/add-resume', isauth, studentcontroller.postaddresume)

router.get('/view-company', isauth, studentcontroller.getviewcompanies)
router.get('/view-placement', isauth, studentcontroller.getviewplacement);
module.exports = router;
