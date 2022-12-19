const axios = require('axios');
const helpers = require('../helpers')


/*
    Return a list of the official names of a Pokemon's forms

    Input:
        forms:  an array of objects, each object contains information about one form of a Pokemon
    Output:
        An array of strings, each string is the official form name
*/
async function getFormNames(forms, isNidoran) {
    if (isNidoran === true) {
        return [
            {name: "Nidoran\u2642", value: "nidoran-m"},
            {name: "Nidoran\u2640", value: "nidoran-f"}
        ];
    }
    let result = [];
    for (let form of forms) {
        let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${form.pokemon.name}`);
        if (data.form_name === "") {
            result.push({
                name: helpers.capitalize(data.name),
                value: data.name
            });
        }
        else {
            let form_names = data.form_names.length > 0 ? data.form_names : data.names;
            let english_form = form_names.find((form) => form.language.name === 'en');
            result.push({
                name: english_form.name,
                value: data.name
            });
        }
    }
    return result;
}



/*
    Call the PokeAPI for the Pokemon species information 

    Input:
        pokemon:    a string or an integer representing a Pokemon in the National Dex
    Output:
        The result of the API call
*/
async function getSpeciesInfo(pokemon) {
    try {
        if (pokemon === 'nidoran') {
            var { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/nidoran-m/`);
        }
        else {
            var { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);
        }
        return data;
    } catch(e) {
        throw "Pokemon not found"
    }
}



/* 
    Get the Pokemon's information to display to the user

    Input: 
        pokemon:    a string or an integer representing a Pokemon in the National Dex
        formNum:    the form of the Pokemon (default 0, meaning default form)
    Output:
        An object containing the Pokemon information:
            - User's search term
            - National Dex number
            - A list of the Pokemon's forms
            - Genus
            - Types
            - Height
            - Weight
            - Flavor text entry
*/
async function getDexInfo(pokemon, formNum=0) {
    pokemon = helpers.checkValidSearch(pokemon);
    let speciesInfo = await getSpeciesInfo(pokemon);
    let genus, types, height, weight, description;
    // Get the genus of the Pokemon in English
    for (let gns of speciesInfo.genera) {
        if (gns.language.name === 'en') {
            genus = gns.genus;
            break;
        }
    }

    // Get the list of official names of the Pokemon's forms
    let formsInfo = speciesInfo.varieties;
    let formNames = formsInfo.length > 1 ? await getFormNames(formsInfo, pokemon==='nidoran') : [];

    // Get the selected form's height and weight
    let selectedForm = formsInfo[formNum];
    const { data } = await axios.get(selectedForm.pokemon.url);
    let pokemonInfo = data;
    types = pokemonInfo.types.map((index) => helpers.capitalize(index.type.name));
    height = (pokemonInfo.height/10).toFixed(1);
    weight = (pokemonInfo.weight/10).toFixed(1);

    // Get the flavor text entry (not including Legends: Arceus unless the Pokemon was introduced
    //   in the generation)
    let fte = speciesInfo.flavor_text_entries;
    if (speciesInfo.generation.name === 'generation-viii') {
        var english_entries = fte.filter((entry) => entry.language.name === 'en');
    }
    else {
        var english_entries = fte.filter((entry) => entry.language.name === 'en' && entry.version.name !== 'legends-arceus');
    }
    description = english_entries[english_entries.length-1].flavor_text;

    // Return the information
    return {
        searchPokemon: pokemon,
        pokedexNum: pokemonInfo.id,
        formNames: formNames,
        genus: genus,
        types: types,
        height: height,
        weight: weight,
        description: description
    };
}


module.exports = {
    getDexInfo
}