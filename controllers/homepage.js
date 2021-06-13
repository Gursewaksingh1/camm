const Admin = require('../model/admin');
const Company = require('../model/company');
const Student = require('../model/student');
const bcrypt = require('bcrypt');
exports.home = (req, res, next) => {
    const products = []
    res.render('homepage/homepage', {
        prods: products,
        pageTitle: 'All Products',
        path: '/product',
        admin: false
      });
    };

    exports.getadminlogin = (req, res, next) => {
      res.render('auth/adminlogin', {
        pageTitle: 'login',
        path: 'login',
        editing: false,
        errormsg: req.flash('error'),
        errormsgs: req.flash('errors'),

      })
      Admin.find()
  .then(admins => {
console.log(admins[0])
    if (admins[0] === undefined) {
      const name = 'gursewak singh';
      const email = 'gs7788264@gmail.com';
      const password = '12345';
      const sinceInCompany = 1999;
      const contactNo = 8196030302;
      const address = 'nordi adda tarn taran';
      console.log('eesssse');
      bcrypt
      .hash(password, 12)
      .then(hashpw => {
        const admin = new Admin({
          name,
          email,
          password: hashpw,
          sinceInCompany,
          contactNo,
          address,
        })
        return admin.save();
      })
    }
    console.log(admins);
  }).catch(err => {
    console.log(err);
  });
    }

    exports.postadminlogin = (req, res, next) => {
      req.session.ww = true;
      const email = req.body.email;
      const password = req.body.password;
      Admin.findOne({ email: email })
        .then(admin => {
          if (!admin) {
            req.flash('error', 'invalid email or password')
             return res.redirect('/adminlogin');
          }
          bcrypt.compare(password, admin.password)
            .then(domatch => {
              if (domatch) {
                req.session.isloginedadmin = true;
                req.session.admin = admin;
                return req.session.save(err => {
                  res.redirect('/admin');
                })
              }
              req.flash('errors', 'invalid email or password');
              
              res.redirect('/adminlogin');
            })
            .catch(err => {
              console.log(err);
            });
          
        })
    }
    exports.getcompanylogin = (req, res, next) => {
      res.render('auth/companylogin', {
        pageTitle: 'login',
        path: 'login',
        editing: false,
        errormsg: req.flash('error'),
        errormsgs: req.flash('errors'),
      })
    }
    
    exports.postcompanylogin = (req, res, next) => {
      const email = req.body.email;
      const password = req.body.password;
      Company.findOne({ email: email })
        .then(company => {
          if (!company) {
            req.flash('error', 'invalid email or password');
            return res.redirect('/companylogin')
          }
          bcrypt.compare(password, company.password)
            .then(domatch => {
              if (!domatch) {
                req.flash('errors', 'invalid email or password');
                return res.redirect('companylogin');
              }

              req.session.isloginedcompany = true;
              req.session.company = company;
              return req.session.save(err => {
                res.redirect('/company');
            
              })
            })
            .catch(err => {
              console.log(err);
            })
        })
}
    exports.getstudentlogin = (req, res, next) => {
      res.render('auth/studentlogin', {
        pageTitle: 'login',
        path: 'login',
        editing: false,
        errormsg: req.flash('error'),
        errormsgs: req.flash('errors'),
      })
    }
    
    exports.poststudentlogin = (req, res, next) => {
      const email = req.body.email;
      const password = req.body.password;
      Student.findOne({ email: email })
        .then(student => {
          if (!student) {
            req.flash('error', 'invalid email or password');
            return res.redirect('/studentlogin');
          }
          bcrypt.compare(password, student.password)
            .then(domatch => {
              if (domatch) {
                req.session.student = student;
                req.session.isloginedstudent = true;
                return req.session.save(err => {
                  res.redirect('/student');
                })
              }
              req.flash('errors', 'invalid email or password');
              res.redirect('/studentlogin');
            })
            .catch(err => {
              console.log(err);
            });
        })
    }

    exports.postlogout = (req, res, next) => {
      req.session.destroy(err => {
        res.redirect('/');
      })
    }

    exports.getaboutus = (req, res, next) => {
      res.render('homepage/about-us', {
        pageTitle: 'about-us',
        path: 'about-us'
      })
    }

    exports.getcontactus = (req, res, next) => {
      res.render('homepage/contact-us', {
        pageTitle: 'contact-us',
        path: 'contact-us'
      })
    }