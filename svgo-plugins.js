const removeDimensions = require('svgo/plugins/removeDimensions');
const removeViewBox = require('svgo/plugins/removeViewBox');

function svgoPlugins() {
  removeViewBox.active = false;
  removeDimensions.active = true;
  return [
    removeDimensions,
    removeViewBox,
    {
      removeAttrs: {
        attrs: ['width', 'height']
      }
    },
    { removeTitle: true },
    { convertColors: { currentColor: true } }
  ];
}

module.exports = {
  svgoPlugins
};
