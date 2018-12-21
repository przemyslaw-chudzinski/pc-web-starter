const helpers = require('./hbs-helpers');
/* Handlebars options */
module.exports = {
    ignorePartials: true,
    partials : {},
    batch : ['./src/partials', './src/components'],
    helpers
};
