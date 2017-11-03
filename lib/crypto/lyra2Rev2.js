/*!
 * lyra2rev2.js - scrypt for vcoin
 */
const vertcoinhash = require('vertcoinhash/build/Release/vertcoinhash');

/**
 * Calculates a Lyra2REv2 hash using the vertcoinhash module.
 * @alias module:crypto/lyra2rev2.derive
 * @param {Buffer} data
 * @returns {Buffer}
 */
function derive(data) {
  return vertcoinhash.SumLyra2REv2(data);
}

exports.derive = derive;
