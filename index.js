const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const compression = require('compression')
const mongoose = require('mongoose')
const path = require('path');

const pdf = require('html-pdf');
const pdfTemplate = require('./Documents');

require('dotenv').config();
const URL = process.env.NODE_ENV === 'production' ? process.env.DB_URL_CLOUD : process.env.DB_URL_LOCAL
// process.env.NODE_ENV === 'production' ? process.env.DB_URL : process.env.DB_URL_LOCAL


mongoose.connect(URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (!err) {
        console.log('Connection to Database has been established.');
    }
    else {
        console.log('Error in connecting to Database.' + err);
    }
});


const authRoute = require('./routes/user');
const employeeRoute = require('./routes/employee');
const adminRoute = require('./routes/admin');

// Init
const app = express();
// app.use(favicon(path.join(__dirname, 'client', 'public', 'favicon.ico')))
app.use(compression());

// Required Middlewares
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');

    next();
})

app.use(morgan('tiny'))
// Registered Middlewares
app.use('/auth', authRoute);
app.use('/emp', employeeRoute);
app.use('/admin', adminRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

const PORT = process.env.PORT || 4000;

// Server Listener
app.listen(PORT, () => {
    console.log(`App is up and running on PORT No. ${PORT}`)
});