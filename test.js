const axios = require('axios');

async function main() {
    for (let i = 1; i <= 10418; i++) {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${i}`);
        if (data.form_names.length === 0) {
            console.log(data.name);
        }
        if (i % 50 === 0) {
            console.log(i);
        }
        if (i === 905) {
            console.log("Finished with normal forms");
            i = 10000;
        }
    }
}

main();