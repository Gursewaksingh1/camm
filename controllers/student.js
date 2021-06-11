const Student = require('../model/student');
const Company = require('../model/company');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');
const selectedStudent = require('../model/seletcted-student'); 
const student = require('../model/student');
``
exports.getaddstudent = (req, res, next) => {
    res.render('student/add-student', {
        pageTitle: 'add-student',
        path: '/add-student',
        editing: false,
        haserror: false,
        errorsmsg: req.flash('error')
    })
}

exports.postaddstudent = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const stream = req.body.stream;
    const inWhichYear = req.body.inWhichYear;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('student/add-student', {
            pageTitle: 'add-student',
            path: '/add-student',
            editing: false,
            haserror: true,
            errorsmsg: req.flash('error'),
            product: {
             name,
             email,
             password,
             stream,
             inWhichYear  
            },
            errormsg: errors.array()[0].msg,
        });
    }
    Student.findOne({ email: email })
        .then(student => {
            
            if (!student) {
                bcrypt
                .hash(password, 12)
                .then(password => {
                    const student = new Student({
                        name, 
                        email,
                        password, 
                        stream, 
                        inWhichYear
                    });
                    student.save();
                })
                .then(() => {
                    res.redirect('/studentlogin');
                })
           
            } else {
                req.flash('error', 'Email already exist');
                res.redirect('/student/addstudent');
            }
        })

}

exports.gethome = (req, res, next) => {
    res.render('student/home', {
        pageTitle: 'student-homepage',
        path: 'home'
    })
}

exports.getstudentdetail = (req, res, next) => {
 const studentid = req.student._id;
 Student.findById(studentid)
    .then(student => {
        res.render('student/student-detail', {
            path: 'student-detail',
            pageTitle: 'student-detail',
            product: student,
            editing: true
        })
    })
    .catch(err => console.log(err))   
}
exports.poststudentdetail = (req, res, next) => {
    const updname = req.body.name;
    const updemail = req.body.email;
    const updstream = req.body.stream;
    const updinWhichYear = req.body.inWhichYear;
    const studentid = req.body.studentid
    Student.findById(studentid)
        .then(student => {
            student.name = updname;
            student.email = updemail; 
            student.stream = updstream;
            student.inWhichYear = updinWhichYear;
            student.save();
        })
        .then(() => {
            res.redirect('/student/student-detail');
        })
}
exports.getaddresume = (req, res, next) => {
    res.render('student/add-resume', {
        pageTitle: 'add-resume',
        editing: false,
        path: 'addresume'
    })
}

exports.postaddresume = (req, res, next) => {
    const imageUrl = req.file.path;
    console.log(req.file)
    if (!req.file) {
        const error = new Error('ddddd');
        throw error;
    }
    student.findById(req.student._id)
        .then(student => {
            student.resumeUrl = imageUrl;
            student.save()
        }).then(result => {
            res.redirect('/student/student-detail')
        }).catch(err => {
            console.log(err);
        })
    // const marticsMarks = req.body.marticsMarks;
    // const secondaryMarks = req.body.secondaryMarks;
    // const gradutionMarks = req.body.gradutionMarks;
    // const experience = req.body.experience;
    // const imageUrl = req.file.path;
    // const  Studentid = req.student._id;
    // console.log(req.file)
    // if (!req.file) {
    //     const error = new Error('ddddd');
    //     throw error;
    // }
    // const addresume = new AddResume({
    // marticsMarks,
    // secondaryMarks,
    // gradutionMarks,
    // experience,
    // imageUrl,
    // Studentid,
    // })
    // addresume.save();
}

exports.getviewcompanies = (req, res, next) => {
    Company.find()
        .then(result => {
            res.render('student/view-companies', {
                pageTitle: 'All-companies',
                path: 'all-companies',
                foradmin: false,
                prods: result
            })
        })
}

exports.getviewplacement = (req, res, next) => {
  const email = req.student.email;
  // console.log(studentId)
    selectedStudent.find({ email  })
    .then(result => {
        res.render('student/view-placement', {
            pageTitle: 'view-placement',
            path: 'view-placement',
            prods: result,
        })
        // console.log(result.studentid)
    }).catch(err => {
        console.log(err);
    })  
};
