const Company = require('../model/company');
const seletedstudent = require('../model/seletcted-student');
const student = require('../model/student');
const fs = require('fs');
const seletctedStudent = require('../model/seletcted-student');

exports.gethome = (req, res, next) => {
   res.render('companies/home', {
       pageTitle: 'home',
       path: 'companies/home',
       
   }) 
}

exports.getothercompanies = (req, res, next) => {
    Company.find()
        .then(companies => {
            res.render('companies/all-companies', {
                pageTitle: 'Other-Companies',
                path: '/company/other-companies',
                prods: companies,
                editing: false,
                foradmin: false
            })
        })
        .catch(err => console.log(err))
    
}
exports.getallresume = (req, res, next) => {
    student.find()
        .then(resume => {
            res.render('companies/showallresume', {
                pageTitle: 'student-resume',
                path: 'student-resume',
                prods: resume
            })
        })
        .catch(err => console.log(err))
}

exports.getStudentResume = (req, res, next) => {
    const studentId = req.params.studentId;
    console.log(studentId)
    student.findById(studentId)
      .then(student => {
          const path = student.resumeUrl
        fs.readFile(path, (err, data) => {
              if (err) {
                return next(err);
              }
              res.setHeader('Content-Type', 'application/pdf');
              res.send(data);
            });
      })
};

exports.getSelectedStudent = (req, res, next) => {
    const companyId = req.company._id;
    seletctedStudent.find({companyId })
        .then(selectedstudent => {
            res.render('companies/selected-student', {
                pageTitle: 'selected-students',
                path: 'selected-students',
                prods: selectedstudent,
            });
        }).catch(err => {
            console.log(err);
        });
};

exports.postSelectedStudent = (req, res, next) => {
  const studentId = req.params.studentId;
  let name;
  let email;
  let stream;
  let company = req.company.nameOfCompany;
  console.log(company)
  student.findById(studentId)
    .then(student => {
        name = student.name;
        email = student.email;
        stream = student.stream;
        // console.log(stream)
    })
    .then(result => {
        const seletedStudent = new seletedstudent({
            name: name,
            email: email,
            stream: stream,
            Studentid: studentId,
            companyId: req.company._id,
            company: company,
        })
        seletedStudent.save()
    }).then(results => {
        res.redirect('/company/selected-students')
    })
    .catch(err => {
        console.log(err);
    });
};
