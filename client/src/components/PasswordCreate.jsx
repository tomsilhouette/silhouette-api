const sha1 = require('js-sha1');

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
    const hash = sha1(slice);
    console.log('HASHED SLICE: ', hash);

    // Has the slice
    let hashChars = hash.slice(0, 2);
    console.log('CHARS: ', hashChars);

    // add letters to string
    passString = passString + hashChars;
    console.log('PASS STRING: ', passString);
    console.log('');
  }

  return passString;
}
