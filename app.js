const express = require('express');

const app = express();

//Looks for templates in the views folder by default
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    //res.send('<h1>I love programming</h1>');
    res.render('index');
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?", hint: "Think about whose tomb it is."});
});

app.get('/hello', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});

