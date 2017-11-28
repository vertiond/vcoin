/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';

const Address = require('../lib/primitives/address');
const Script = require('../lib/script/script');
const assert = require('./util/assert');

describe('Address', function() {
  it('should match mainnet p2pkh address', () => {
    const raw = 'ea68048920290987e56e9afe25cedfa8a6f57803';
    const p2pkh = Buffer.from(raw, 'hex');
    const addr = Address.fromPubkeyhash(p2pkh);
    const expectedAddr = 'VwNFdsnxeimcU8WDsVeW91swiTZVbvGkuy';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet p2pkh address 2', () => {
    const raw = '4234213c9551d7627a67922ef77dafbd0bd5cc39';
    const p2pkh = Buffer.from(raw, 'hex');
    const addr = Address.fromPubkeyhash(p2pkh);
    const expectedAddr = 'Vg2sxR3t2dTMPHFmhHzNAg1HvDGvKbHxsg';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match testnet p2pkh address', () => {
    const raw = '78b316a08647d5b77283e512d3603f1f1c8de68f';
    const p2pkh = Buffer.from(raw, 'hex');
    const addr = Address.fromPubkeyhash(p2pkh, 'testnet');
    const expectedAddr = 'mrX9vMRYLfVy1BnZbc5gZjuyaqH3ZW2ZHz';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should handle wrong p2pkh hash length', () => {
    const raw = '004234213c9551d7627a67922ef77dafbd0bd5cc39';
    const p2pkh = Buffer.from(raw, 'hex');
    assert.throws(() => Address.fromPubkeyhash(p2pkh));
  });

  it('should handle empty p2pkh hash length', () => {
    const raw = '';
    const p2pkh = Buffer.from(raw, 'hex');
    assert.throws(() => Address.fromPubkeyhash(p2pkh));
  });

  it('should match mainnet p2sh address obtained from script', () => {
    const p2sh = Buffer.from(''
                          + '3045022100be28575ec43363f58378bdb58c464550e352fbd659154a0323cc34a14c9a7b9902204135458b808c223dca04eae223e1ecd8c8b17d3b0ac1f6af2ce85a9712c740a3','hex');
    const script = Script.fromRaw(p2sh);
    const addr = Address.fromScript(script);
    const expectedAddr = 'VwhEmt57k9djWo4XEJLDPCdUQWDHP5WhGN';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet p2sh address obtained from script hash', () => {
    const raw = 'a4d06f49aba23fad4f9f26c9378dc20c22c3532b';
    const p2sh = Buffer.from(raw, 'hex');
    const addr = Address.fromScripthash(p2sh);
    const expectedAddr = '3GiUSJUHk9u7L9Q4Ge1ArQLGQ9Rp1xp8Ff';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet p2sh address obtained from script 2', () => {
    const raw = '41f9da53aa1cf0f6bae550a5322796ffe5ca7449';
    const p2sh = Buffer.from(raw, 'hex');
    const addr = Address.fromScripthash(p2sh);
    const expectedAddr = '37hsA6JsTqauouaxBJoJMpdP8MmF6HYcwJ';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match testnet p2sh address', () => {
    const raw = 'c579342c2c4c9220205e2cdc285617040c924a0a';
    const p2sh = Buffer.from(raw, 'hex');
    const addr = Address.fromScripthash(p2sh, 'testnet');
    const expectedAddr = '2NBFNJTktNa7GZusGbDbGKRZTxdK9VVez3n';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet segwit p2wpkh v0 address', () => {
    const raw = '751e76e8199196d454941c45d1b3a323f1433bd6';
    const p2wpkh = Buffer.from(raw, 'hex');
    const addr = Address.fromWitnessPubkeyhash(p2wpkh);
    const expectedAddr = 'vtc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet segwit p2pwsh v0 address', () => {
    const p2wpkh = Buffer.from(''
                        + '1863143c14c51668'
                        + '04bd19203356da13'
                        + '6c985678cd4d27a1'
                        + 'b8c6329604903262', 'hex');
    const addr = Address.fromWitnessScripthash(p2wpkh);
    assert.strictEqual(addr.toString(),
        'vtc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3');
  });

  it('should match testnet segwit p2wpkh v0 address', () => {
    const raw = '751e76e8199196d454941c45d1b3a323f1433bd6';
    const p2wpkh = Buffer.from(raw, 'hex');
    const addr = Address.fromWitnessPubkeyhash(p2wpkh, 'testnet');
    const expectedAddr = 'tvtc1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match testnet segwit p2pwsh v0 address', () => {
    const p2wpkh = Buffer.from(''
                        + '1863143c14c51668'
                        + '04bd19203356da13'
                        + '6c985678cd4d27a1'
                        + 'b8c6329604903262', 'hex');
    const addr = Address.fromWitnessScripthash(p2wpkh, 'testnet');
    assert.strictEqual(addr.toString(),
        'tvtc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7');
  });

  it('should match testnet segwit p2pwsh v0 address 2', () => {
    const p2wpkh = Buffer.from(''
                        + '000000c4a5cad462'
                        + '21b2a187905e5266'
                        + '362b99d5e91c6ce2'
                        + '4d165dab93e86433', 'hex');
    const addr = Address.fromWitnessScripthash(p2wpkh, 'testnet');
    assert.strictEqual(addr.toString(),
        'tvtc1qqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesrxh6hy');
  });

  it('should handle invalid segwit hrp', () => {
    const addr = 'tc1qw508d6qejxtdg4y5r3zarvary0c5xw7kg3g4ty';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle invalid segwit checksum', () => {
    const addr = 'vtc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t5';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle invalid segwit version', () => {
    const addr = 'VTC13W508D6QEJXTDG4Y5R3ZARVARY0C5XW7KN40WF2';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle invalid segwit program length', () => {
    const addr = 'vtc1rw5uspcuh';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle invalid segwit program length 2', () => {
    const addr = 'vtc10w508d6qejxtdg4y5r3zarvary0c5xw7kw5'
               + '08d6qejxtdg4y5r3zarvary0c5xw7kw5rljs90';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle invalid segwit program length for witness v0', () => {
    const addr = 'tvtc1pw508d6qejxtdg4y5r3zarqfsj6c3';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle segwit mixed case', () => {
    const addr = 'tvtc1qrp33g0q5c5txsp9arysrx4k6z'
               + 'dkfs4nce4xj0gdcccefvpysxf3q0sL5k7';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle segwit zero padding of more than 4 bits', () => {
    const addr = 'tvtc1pw508d6qejxtdg4y5r3zarqfsj6c3';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle segwit non-zero padding in 8-to-5 conversion', () => {
    const addr = 'tvtc1qrp33g0q5c5txsp9arysrx4k6'
               + 'zdkfs4nce4xj0gdcccefvpysxf3pjxtptv';
    assert.throws(() => Address.fromString(addr));
  });
});
