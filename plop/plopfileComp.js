const storeGenerator = require('./component-template/prompt');

module.exports = (plop) => {
  plop.setGenerator('component', storeGenerator);
};
