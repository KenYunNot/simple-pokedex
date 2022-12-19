const pokemonRoutes = require('./pokemon');

const constructorMethod = (app) => {
    app.use('/', pokemonRoutes);

    app.use('*', async (req, res) => {
        res.status(404).render('error', {error: 'Not found'});
    });
}

module.exports = constructorMethod;