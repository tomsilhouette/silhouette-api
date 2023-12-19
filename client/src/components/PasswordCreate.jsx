import { Buffer } from 'buffer';
const sha1 = require('js-sha1');
const crypto = require('crypto');

export async function createdPassword() {
  const slices = [
    'UOCjn',
    '{t\\K_]|{]l|',
    'XCgdFCOroCe[nd',
    'l\\{qgS',
    'MJQUJn|xWXvAPX',
    'SicaN',
    '\\wItxsSCfC',
    'FadP{Vj^',
    'QRBLIBHCYv',
    'emfdZ',
  ];

  let passString = '';

  for (const slice of slices) {
    console.log('SLICE: ', slice);

    // Hash the bytes
    const sha = crypto.createHash('sha1');
    const hash = sha.update(slice, 'ascii').digest().subarray(0, 2);
    // add letters to string

    console.log('HASH: ', hash);

    const tidbit = hash.toString('ascii');
    console.log('tidbit: ', tidbit);

    passString += tidbit;
    console.log('PASS STRING: ', passString);
    console.log('');
  }
  return passString;
}
