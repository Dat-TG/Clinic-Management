const hbs = require('express-handlebars')
const express = require('express')
const session = require('express-session')
const { urlencoded } = require('express');
const path=require('path');
const app = express()
const port = 3000

//Use Session 
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'secret-key-123',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 30*24*60*60*1000},
}))


//Router and model
const RegisterRouter=require('./routers/register.r');
const LoginRouter=require('./routers/login.r');
const LogoutRouter=require('./routers/logout.r');
const SearchRouter=require('./routers/search.r');
const DetaiDrugRouter=require('./routers/detail-drug.r');
const ProfileRouter=require('./routers/profile.r');
const DetailDoctorRouter=require('./routers/detail-doctor.r');
const DocumentRouter=require('./routers/doc.r');

const doctorM=require('./model/Doctors.m');

//Use static resources
app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//Template engine
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: [
        path.join(__dirname, '/views/partials')
    ],
    helpers: {
        ifEquals: function(a, b, options) {
            if (a === b) {
              return options.fn(this);
            }
            return options.inverse(this);
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

//Route

app.use('/dang-ky-tai-khoan',RegisterRouter);
app.use('/dang-nhap',LoginRouter);
app.use('/dang-xuat',LogoutRouter);
app.use('/tim-kiem',SearchRouter);
app.use('/thuoc',DetaiDrugRouter);
app.use('/tai-khoan',ProfileRouter);
app.use('/bac-si',DetailDoctorRouter);
app.use('/tai-lieu',DocumentRouter);


app.use('/', async(req, res, next) => {
    const doctors=await doctorM.getAll();
    let role="patient";
    if (req.session.Doctor) {
        role="doctor";
    }
    if (req.session.Username) {
        res.render('home', { display1: "d-none", display2: "d-block", doctors:doctors, role:role});
    }
    else {
        res.render('home', { display1: "d-block", display2: "d-none", doctors:doctors, role:role});
    }
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send(err.message);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})