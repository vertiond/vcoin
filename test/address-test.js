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
    const raw = 'd3995b1e84084601cd8ff0a4d3c170b5be0cd7d5';
    const p2pkh = Buffer.from(raw, 'hex');
    const addr = Address.fromPubkeyhash(p2pkh, 'testnet');
    const expectedAddr = 'X7JU9sPgGLwehbHCQcEgGVsCUEszcv5aVq';
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
                          + '52410491bba2510912a5bd37da1fb5b1673010e4'
                          + '3d2c6d812c514e91bfa9f2eb129e1c183329db55'
                          + 'bd868e209aac2fbc02cb33d98fe74bf23f0c235d'
                          + '6126b1d8334f864104865c40293a680cb9c020e7'
                          + 'b1e106d8c1916d3cef99aa431a56d253e69256da'
                          + 'c09ef122b1a986818a7cb624532f062c1d1f8722'
                          + '084861c5c3291ccffef4ec687441048d2455d240'
                          + '3e08708fc1f556002f1b6cd83f992d085097f997'
                          + '4ab08a28838f07896fbab08f39495e15fa6fad6e'
                          + 'dbfb1e754e35fa1c7844c41f322a1863d4621353ae','hex');
    const script = Script.fromRaw(p2sh);
    const addr = Address.fromScript(script);
    const expectedAddr = '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC';
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
    const expectedAddr = 'vtc1qw508d6qejxtdg4y5r3zarvary0c5xw7kuk9r06';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet segwit p2pwsh v0 address', () => {
    const p2wpkh = Buffer.from(''
                        + '0bfe935e70c321c7'
                        + 'ca3afc75ce0d0ca2'
                        + 'f98b5422e008bb31'
                        + 'c00c6d7f1f1c0ad6', 'hex');
    const addr = Address.fromWitnessScripthash(p2wpkh);
    assert.strictEqual(addr.toString(),
        'vtc1qp0lfxhnscvsu0j36l36uurgv5tuck4pzuqytkvwqp3kh78cupttqsm8c42');
  });

  it('should match testnet segwit p2wpkh v0 address', () => {
    const raw = '584cc9318c56c0ed68c43c9dfa27640f4ae613b8';
    const p2wpkh = Buffer.from(raw, 'hex');
    const addr = Address.fromWitnessPubkeyhash(p2wpkh, 'testnet');
    const  expectedAddr = 'tvtc1qtpxvjvvv2mqw66xy8jwl5fmypa9wvyacsgxf2z';
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
        'tvtc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q895jjz');
   });

  it('should match testnet segwit p2pwsh v0 address 2', () => {
    const p2wpkh = Buffer.from(''
                        + '000000c4a5cad462'
                        + '21b2a187905e5266'
                        + '362b99d5e91c6ce2'
                        + '4d165dab93e86433', 'hex');
    const addr = Address.fromWitnessScripthash(p2wpkh, 'testnet');
    assert.strictEqual(addr.toString(),
        'tvtc1qqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsestnuunc');
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
