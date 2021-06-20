const path = require('path');
const bycrpt = require('bcrypt')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const session = require('express-session');
const MongoDB_store = require('connect-mongodb-session')(session)
const bodyparser = require('body-parser');
const flash = require('connect-flash');
// const csrf = require('csurf');

const Admin = require('./model/admin')
const Company = require('./model/company')
const Student = require('./model/student')

const errorcontroller = require('./controllers/error');
const mongoose = require('mongoose');
//const mongoconnect = require('./util/database').mongoconnect
const adminrouter = require('./routes/admin');
const studentrouter = require('./routes/student');
const companyrouter = require('./routes/company');
const homepage = require('./routes/homepage');
const multer = require('multer');

app.set('view engine', 'ejs');
app.set('views', 'views');

// const csrfProduction = csrf();

const _URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus';
const store = new MongoDB_store({
  uri: _URI,
  collection: 'session',
})
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'resume');
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + '-' + file.originalname );
  },
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/png'
      || file.mimetype === 'image/jpg'
      || file.mimetype === 'application/pdf'
      || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ storage: fileStorage}).single('resume'))

app.use('/images', express.static(path.join(__dirname, 'resume')));
app.use(bodyparser.urlencoded({extended: false }));
//app.use(csrfProduction)
app.use(flash());

app.use(session({ 
  secret: 'this is my secret', 
  resave: false,
  saveUninitialized: false,
  store: store
 } 
 ))


// app.use((req, res, next) => {
//   //res.locals.csrfToken = req.csrfToken();;
//   next();
// });
app.use((req, res, next) => {
  if (!req.session.admin) {
    return next();
  }
  Admin.findById(req.session.admin._id)
    .then(admin => {
      req.admin = admin;
      next();
    })
    .catch(err => {
      console.log(err);
    })
})

app.use((req, res, next) => {
  if (!req.session.company) {
    return next();
  }
  Company.findById(req.session.company._id)
    .then(company => {
      req.company = company;
      next();
    })
    .catch(err => {
      console.log(err);
    })
})

app.use((req, res, next) => {
  if (!req.session.student) {
    return next();
  }
  Student.findById(req.session.student._id)
    .then(student => {
      req.student = student;
      next();
    })
    .catch(err => {
      console.log(err);
    })
})



app.use('/admin', adminrouter);
app.use('/student', studentrouter);
app.use(homepage)
app.use('/company', companyrouter);
app.use(errorcontroller.error)

// Admin.find()
//   .then(admins => {
// console.log(admins[0])
//     if (admins[0] === undefined) {
//       const name = 'gursewak singh';
//       const email = 'gs7788264@gmail.com';
//       const password = '12345';
//       const sinceInCompany = 1999;
//       const contactNo = 8196030302;
//       const address = 'nordi adda tarn taran';
//       console.log('eesssse');
//       bycrpt
//       .hash(password, 12)
//       .then(hashpw => {
//         const admin = new Admin({
//           name,
//           email,
//           password: hashpw,
//           sinceInCompany,
//           contactNo,
//           address,
//         })
//         return admin.save();
//       })
//     }
//     console.log(admins);
//   }).catch(err => {
//     console.log(err);
//   });

mongoose.connect(_URI)
  .then(result => {
      console.log('connected')
        
    app.listen(port, () => {
      console.log(`listen on ${port}`);
    });
  })
  .catch(err => console.log(err))
