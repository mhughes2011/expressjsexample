const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
//The above can be rewritten to the code below
// const data = require('../data/flashcardData.json').data;
const {cards} = data;
//The line above can be rewritten to the below code.  The above is ES6 format
// const cards = data.cards;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashCardId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${flashCardId}`);
});

//Implementing the :id in the route allows you to control the access of data via the url.  The :id specifically means a variable and whatever is put in there will be retrieved in the cards array.  If id=0 then it's cards[0], if id=apple then it's cards[apple] (which will come up with and error)
router.get('/:id', (req, res) => {
    const {side} = req.query; //could also be const side = req.query.side
    const {id} = req.params; //could also be const id = req.query.id

    if(!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const {hint} = cards[id];

    const templateData = {id,text,name};

    if(side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    }else if(side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    res.render('card', templateData);
});

module.exports = router;