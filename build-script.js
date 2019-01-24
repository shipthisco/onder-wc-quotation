const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

  const files = [
    './dist/onder-wc-quotation/runtime.js',
    './dist/onder-wc-quotation/polyfills.js',
    './dist/onder-wc-quotation/main.js',
    './dist/onder-wc-quotation/scripts.js'
  ];

  await fs.ensureDir('elements');

  await concat(files, 'elements/quotation-element.js');
  console.info('Elements created successfully!')

})();
