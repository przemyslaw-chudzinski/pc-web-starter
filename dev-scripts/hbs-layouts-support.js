const Handlebars = require('gulp-compile-handlebars').Handlebars;
const fs = require('fs');
const path = require('path');

const _layoutsDirPath = () => path.join(__dirname, '..', 'src', 'layouts');

const _layoutFileName = layout => layout + '.hbs';

const _layoutPath = layout => _layoutsDirPath() + '/' + _layoutFileName(layout);

const _getLayoutTpl = (layout = 'master', encodencoding = 'utf8') => {
    let result = false;
    try {result = fs.existsSync(_layoutPath(layout));} catch (e) {}
    try {
        return fs.readFileSync(_layoutPath(layout), encodencoding);
    } catch (e) {}
    return result;
};

const extend = options => {
    const layoutTpl = _getLayoutTpl(options.hash.layout || 'master');
    const contentTpl = options.fn(this);
    const replacedTpl = layoutTpl && layoutTpl.replace(/{{#content}}/, contentTpl);
    return replacedTpl && typeof replacedTpl === 'string' && Handlebars.compile(replacedTpl)({...options.hash, ...options.data.root});
};

module.exports = extend;
