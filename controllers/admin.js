const bcrypt = require('bcrypt');
const Student = require('../model/student')
const Company = require('../model/company')
const Admin = require('../model/admin');
const { validationResult } = require('express-validator/check');

exports.adminhomepage = (req, res, next) => {
  res.render('homepage/homepage', {
    pageTitle: 'admin-home-page',
    path: 'homepage',
    admin: true
  })
}
exports.getallstudents = (req, res, next) => {
    Student.find()
    .then((products) => {
      res.render('admin/getallstudent', {
        prods: products,
        pageTitle: 'All students',
        path: '/product',
      })
    })
}

exports.geteditstudent = (req, res, next) => {
  const studentid = req.params.studentid;
  Student.findById(studentid)
    .then(product => {
      res.render('student/add-student', {
        pageTitle: 'Update-student',
        path: '/update-student',
        editing: true,
        product: product,
        haserror: false,
        errorsmsg: req.flash('error'),
      })
    })
    .catch(err => console.log(err))
}

exports.posteditstudent = (req, res, next) => {
  const studentid = req.body.studentid;
  const updatedname = req.body.name;
  const updatedemail  = req.body.email;
  const updatedpassword = req.body.password;
  const updatedstream = req.body.stream;
  const updatedinWhichYear = req.body.inWhichYear
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('student/add-student', {
            pageTitle: 'add-student',
            path: '/add-student',
            editing: true,
            haserror: true,
            product: {
             name: updatedname,
             email: updatedemail,
             stream: updatedstream,
             password: updatedpassword,
             inWhichYear: updatedinWhichYear,
             _id: studentid,  
            },
            errorsmsg: req.flash('error'),
            errormsg: errors.array()[0].msg,
        });
    }
  Student.findById(studentid)
    .then(student => {
      student.name = updatedname;
      student.email = updatedemail;
      student.stream = updatedstream;
      student.inWhichYear = updatedinWhichYear;
      student.save();
    })
    .then(() => {
      res.redirect('/admin/all-students')
    })
    .catch(err => console.log(err))
}

exports.postdeletestudent = (req, res, next) => {
  const studentid = req.body.studentid;
  Student.findByIdAndRemove(studentid).then(result => {
    console.log('deleted');
    res.redirect('/admin/all-students');
  })
  .catch(err => console.log(err))
}
exports.getaddcompany = (req, res, next) => {
  res.render('companies/add-company', {
      pageTitle: 'add-company',
      path: '/add-company',
      editing: false,
      haserror: false,
      errorsmsg: req.flash('error')
  })
}

exports.postaddcompany = (req, res, next) => {
  const nameOfCompany = req.body.nameOfCompany;
  const email = req.body.email;
  const password = req.body.password;
  const ownerName = req.body.ownerName;
  const aboutCompany = req.body.aboutcompany;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return  res.render('companies/add-company', {
      pageTitle: 'add-company',
      path: '/add-company',
      editing: false,
      haserror: true,
      product: {
        nameOfCompany,
        email,
        password,
        ownerName,
        aboutCompany,
      },
      errorsmsg: req.flash('error'),
      errormsg: errors.array()[0].msg,
  })
  }
  Company.findOne({ email: email })
    .then(company => {
      if (!company) {
        bcrypt.hash(password, 12)
        .then(password => {
          const company = new Company({
            nameOfCompany,
            email,
            password,
            ownerName,
            aboutCompany
          })
          company.save();     
        })
        .then(() => {
          res.redirect('/admin/all-companies')
        })
     
      } else {
        req.flash('error', 'Email already exist');
          res.redirect('/admin/addcompany')
      }
    })
    .catch(err => console.log(err))
  
}

exports.getallcompanies = (req, res, next) => {
  Company.find()
  .then(company => {
    res.render('companies/all-companies', {
      pageTitle: 'allCompanies',
      editing: false,
      prods: company,
      foradmin: true,
      path: '/admin/all-companies'
    })
  })
  .catch(err => console.log(err))
}

exports.geteditcompany = (req, res, next) => {
  const companyid = req.params.companyid;
  Company.findById(companyid)
  .then(product => {
    if (!product) {
      res.redirect('/');
    }
    res.render('companies/add-company', {
      pageTitle: 'update',
      path: '/updatee',
      editing: true,
      haserror: false,
      errorsmsg: req.flash('error'),
      product: product
    })
  })
  .catch(err => console.log(err))
}

exports.posteditcompany = (req, res, next) => {
  const updatednameOfCompany = req.body.nameOfCompany;
  const updatedemail = req.body.email;
  const updatedownerName = req.body.ownerName;
  const updatedpassword = req.body.password;
  const updatedaboutCompany = req.body.aboutcompany;
  const companyid = req.body.companyid;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('companies/add-company', {
      pageTitle: 'add-company',
      path: '/add-company',
      editing: true,
      haserror: true,
      product: {
        nameOfCompany: updatednameOfCompany,
        email: updatedemail,
        ownerName: updatedownerName,
        password: updatedpassword,
        aboutCompany: updatedaboutCompany,
        _id: companyid
      },
      errorsmsg: req.flash('error'),
      errormsg: errors.array()[0].msg,
  })
  }
  Company.findById(companyid)
  .then(company => {
    company.nameOfCompany = updatednameOfCompany;
    company.email = updatedemail;
    company.ownerName = updatedownerName;
    company.aboutCompany = updatedaboutCompany;
    company.save();
  })
  .then(() => {
    res.redirect('/admin/all-companies');
  })
  .catch(err => console.log(err))
}

exports.postdeletecompany = (req, res, next) => {
  //console.log('hhhhhh')
  const companyid = req.body.companyid;
  // console.log(companyid)
  Company.findByIdAndRemove(companyid)
  .then(ressult => {
    res.redirect('/admin/all-companies')
  })
  .catch(err => console.log(err))
}

exports.getalladmin = (req, res, next) => {
  Admin.find()
    .then(admin => {
      res.render('admin/all-admin', {
        pageTitle: 'all-admin',
        prods: admin,
        editing: false,
        haserror: false,
        path: 'all-admin'
      })
    })
}

exports.postdeleteadmin = (req, res, next) => {
  const adminid = req.body.adminid;
  console.log(adminid)
  Admin.findByIdAndRemove(adminid)
  .then(ressult => {
    res.redirect('/admin/all-admin')
  })
  .catch(err => console.log(err))
}
exports.getaddadmin = (req, res, next) => {
  res.render('admin/addadmin', {
    pageTitle: 'add-admin',
    path: '/admin/add-admin',
    editing: false,
    haserror: false,
    errorsmsg: req.flash('error'),
  })
}

exports.postaddadmin = (req, res, next) => {
  
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const sinceInCompany = req.body.sinceInCompany;
  const contactNo = req.body.contactNo;
  const address = req.body.address;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('admin/addadmin', {
      pageTitle: 'add-admin',
      path: '/admin/add-admin',
      editing: false,
      haserror: true,
      admin: {
       name,
       email,
       password,
       sinceInCompany,
       contactNo,
       address,
      },
      errorsmsg: req.flash('error'),
      errormsg: errors.array()[0].msg,
    });

  }
  Admin.findOne({ email: email })
    .then(admin => {
      if (!admin) {
        console.log(password)
        bcrypt
          .hash(password, 12)
          .then(password => {
            const admin = new Admin({
              name,
              email,
              password,
              sinceInCompany,
              contactNo,
              address
                })
          admin.save();
          })
          .then(() => {
            res.redirect('/admin');
          })
        
      }
      else {
        req.flash('error', 'Email already exist');
        return res.redirect('/admin/add-admin');
      }
    })
    .catch(err => console.log(err))
  
}