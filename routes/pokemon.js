const express = require('express');
const router = express.Router();
const data = require('../data');
const pokemon = data.pokemonData;
const helpers = require('../helpers');
const path = require('path');

router.route("/").get(async (req, res) => {
    res.sendFile(path.resolve('static/homepage.html'));
}); 


router.route("/pokemon").post(async (req, res) => {
    try {
        // Validate search input from form
        let formInput = req.body;
        var { searchPokemon } = formInput;
        let dexInfo = await pokemon.getDexInfo(searchPokemon);
        res.render('pokemonFound', dexInfo)
    } catch(e) {
        res.render('error', {error: e});         
    }
});

module.exports = router;