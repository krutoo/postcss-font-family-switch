const postcss = require('postcss');
const { isString, isNumber } = require('lodash');

const isPixels = value => isString(value) && !!value.match(/(^|-|\d+\.)\d+px/g);

const isFontFamily = value => value && value.type === 'decl' && value.prop === 'font-family';

const isFontSize = value => value && value.type === 'decl' && value.prop === 'font-size';

module.exports = postcss.plugin('postcss-font-family-switch', ({
  largeFamily,
  largeSize = 16,
  smallFamily = null,
} = {}) => {
  if (!isString(largeFamily)) {
    throw Error('Option "largeFamily" must be a string');
  }

  if (!isNumber(largeSize)) {
    throw Error('Option "largeSize" must be a number of pixels');
  }

  return root => {
    root.walkRules(rule => {
      !rule.some(isFontFamily) && rule.walkDecls(declaration => {
        if (isFontSize(declaration) && isPixels(declaration.value)) {
          const pixels = parseFloat(declaration.value);

          if (pixels >= largeSize) {
            declaration.after(`font-family: ${largeFamily}`);
          } else if (isString(smallFamily)) {
            declaration.after(`font-family: ${smallFamily}`);
          }
        }
      });
    });
  };
});
