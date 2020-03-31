module.exports.caesarCoder = function caesarCoder(str, shift) {
  const plain = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];
  const maxIndex = plain.length - 1;

  const chars = str.split('');
  const encoded = chars.map(char => {
    let index = plain.indexOf(char.toUpperCase());
    if (index === -1) {
      return char;
    }
    index += shift;
    if (index < 0) {
      index = plain.length + index;
    }
    if (index > maxIndex) {
      index = 0 + (index - maxIndex - 1);
    }
    const encodedChar = plain[index];
    return char === char.toUpperCase()
      ? encodedChar
      : encodedChar.toLowerCase();
  });
  return encoded.join('');
};
