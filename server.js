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
    ]
}));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))


app.use('/', async(req, res, next) => {
    const DrugsM=require('./model/Drugs.m');
    const rs=await DrugsM.getAll();
    let list=rs.map((item)=>{
        return {
            ID:item.ID,
            Name: item.Name,
            Chemicals:item.Chemicals,
            Unit:item.Unit,
            Price:item.Price,
            Uses:item.Uses
        };
    })
    res.render('home',{list:list});
});



app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send(err.message);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})