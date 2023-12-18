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
    console.log('-- SLICE: ', slice);

    // Using TextEncoder to convert string to ASCII bytes
    const encoder = new TextEncoder();
    const asciiBytes = encoder.encode(slice);

    // Hash the ASCII bytes
    const hash = sha1(asciiBytes);
    console.log('-- HASHED SLICE: ', hash);

    let hashChars = hash.slice(0, 2);
    console.log('-- HASH CHARS: ', hashChars);
    passString = passString + hashChars;

    console.log('-- FULL PASS STRING: ', passString);
    console.log('');
  }

  console.log('-- FINISHED String: ', passString);
  return passString;
}
