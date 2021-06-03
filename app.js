const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Looks for templates in the views folder by default
app.set('view engine', 'pug');

//This is next middleware structure.  It runs every time a req comes into the app.  You can pass in multiple functions to one app.use call or utilize several app.use calls.
app.use((req, res, next) => {
    console.log('Hello');
    const err = new Error('Oh noes!');
    err.status = 500;
    next();
});

app.use((req, res, next) => {
    console.log('World');
    next();
});




app.get('/', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.render('index', {name: name});
    } else {
        res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?", hint: "Think about whose tomb it is."});
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

//This is responsible for creating the error object and handing it off to the error handler below.  This is put towards the end because if all other routes above aren't found then this will be the default 404 error route.
app.use((req, res, next) => {
    const e = new Error('Not Found');
    e.status = 404;
    next(e);
});

//This is the error handler middlware.  The error is created on line 16
app.use((e, req, res, next) => {
    res.locals.error = e;
    res.status(e.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});

