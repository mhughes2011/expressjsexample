const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
//The above can be rewritten to the code below
// const data = require('../data/flashcardData.json').data;
const {cards} = data;
//The line above can be rewritten to the below code.  The above is ES6 format
// const cards = data.cards;

router.get('/:id', (req, res) => {
    res.render('card', { 
        prompt: cards[req.params.id].question, 
        hint: cards[req.params.id].hint
    });
});

module.exports = router;