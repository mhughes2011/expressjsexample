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
    req.message = 'This message made it!';
    next();
});

app.use((req, res, next) => {
    console.log(req.message);
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

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});

