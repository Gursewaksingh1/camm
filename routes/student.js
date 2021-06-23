const express = require('express');
const studentcontroller = require('../controllers/student');
const isauth = require('../midlleware/student-is-auth');
const { body }  = require('express-validator/check');
const router = express.Router();

router.get('/addstudent', studentcontroller.getaddstudent);
router.post('/addstudent',[
    body('name', 'name must be an alphabatic and constin 5 charcater').isString().isLength({min: 5}).trim(),
    body('email','must use email structure in email box').isEmail(),
    body('password', 'password must contain atleast five character').trim().isLength({min: 5, max: 30}),
    body('stream', 'write your stream only in alphabatically like BCA').trim().isString().isLength({min: 1}),
   body('inWhichYear', 'must write your year of college like first year').trim().isString().isLength({min: 1})
    ], studentcontroller.postaddstudent)

router.get('/', isauth, studentcontroller.gethome);

router.get('/student-detail', isauth, studentcontroller.getstudentdetail);
router.post('/student-detail', isauth, studentcontroller.poststudentdetail);

router.get('/add-resume', isauth, studentcontroller.getaddresume)
router.post('/add-resume', isauth, studentcontroller.postaddresume)

router.get('/view-company', isauth, studentcontroller.getviewcompanies)
router.get('/view-placement', isauth, studentcontroller.getviewplacement);
module.exports = router;
