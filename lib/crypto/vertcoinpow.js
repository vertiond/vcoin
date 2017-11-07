/*!
 * vertcoin.js - proof of work functions for vertcoin
 */
const vertcoinhash = require('vertcoinhash/build/Release/vertcoinhash');

/**
 * Calculates a Lyra2REv2 hash using the vertcoinhash module.
 * @alias module:crypto/vertcoinhash.lyra2rev2
 * @param {Buffer} data
 * @returns {Buffer}
 */
function lyra2rev2(data) {
  return vertcoinhash.SumLyra2REv2(data);
}

/**
 * Calculates a Lyra2RE hash using the vertcoinhash module.
 * @alias module:crypto/vertcoinhash.lyra2re
 * @param {Buffer} data
 * @returns {Buffer}
 */
function lyra2re(data) {
  return vertcoinhash.SumLyra2RE(data);
}

/**
 * Calculates a ScryptN hash using the vertcoinhash module.
 * @alias module:crypto/vertcoinhash.scryptn
 * @param {Buffer} data
 * @returns {Buffer}
 */
function scryptn(data) {
  return vertcoinhash.SumScryptN(data);
}

/**
 * Calculates proof-of-work using the correct algorithm based on a timestamp.
 * @alias module:crypto/vertcoinhash.pow
 * @param {Buffer} data
 * @param {Number} time
 * @returns {Buffer}
 */
function pow(data, time) {
  // todo: @Cubey2019 testnet always lyra2rev

  // vertcoin uses a different pow algorithm based on the block height
  // bcoin doesn't always know the height when verifying blocks, so using the timestamp instead avoids having to change APIs
  //
  //  347001+    lyra2rev2   (ts = 1439191247)
  //  208301+    lyra2re     (ts = 1418454333)
  //       0+    scryptn

  if (!time || time >= 1439191247) {
    return lyra2rev2(data);
  } else if (time >= 1418454333) {
    return lyra2re(data);
  }
  return scryptn(data);
}

exports.lyra2re = lyra2re;
exports.lyra2rev2 = lyra2rev2;
exports.scryptn = scryptn;
exports.pow = pow;
