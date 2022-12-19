/* 
    Module with helper functions
*/

// Capitalize the first letter of the given string
function capitalize(str) {
    if (str === undefined) throw "Error: must supply a function input";
    if (typeof str !== 'string') "Error: input must be of type string";
    if (str.trim().length === 0) "Error: string must be non-empty";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Validate input
function checkValidSearch(pokemon) {
    if (pokemon === undefined) throw "Must supply Pokemon name or National Dex number";
    if (pokemon.trim().length === 0) throw "Input must be non-empty"
    if (isNaN(pokemon)) {
        if (/\./.test(pokemon)) throw "National dex number must be a whole integer";
        if (/-/.test(pokemon)) throw "National dex number must be non-negative";
    }
    return pokemon.trim().toLowerCase();
}

module.exports = {
    capitalize,
    checkValidSearch
}