const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Looks for templates in the views folder by default
app.set('view engine', 'pug');

//This is used when separating the routes into their own structure
const mainRoutes = require('./routes/index');
const cardRoutes = require('./routes/cards');

//This implements the use of those routes created above.
app.use(mainRoutes);
app.use('/cards', cardRoutes);

//This is responsible for creating the error object and handing it off to the error handler below.  This is put towards the end because if all other routes above aren't found then this will be the default 404 error route.
app.use((req, res, next) => {
    const e = new Error('Not Found');
    e.status = 404;
    next(e);
});

//This is the error handler middleware.  The error is created on line 16
app.use((e, req, res, next) => {
    res.locals.error = e;
    res.status(e.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});

