// import fs from 'fs/promises';

const fs = require('fs/promises');

const read = () => {
  fs.readFile('./data/words3.tsv', { encoding: 'utf-8' }).then((data) => {
    const processedData = data.split('\r\n').map((el) => {
      const words = el.split('\t');
      if (words.length > 3) console.error('alert!');
      return {
        lang1: 'Turk',
        lang2: 'English',
        lang3: 'Russian',
        word1: words[0],
        word2: words[1],
        word3: words[2],
      };
    });
    const processedData2 = data.split('\r\n').map((el) => {
      const words = el.split('\t');
      if (words.length > 3) console.error('alert!');
      return {
        tur: words[0].length === 0 ? 'n/a' : words[0],
        eng: words[1].length === 0 ? 'n/a' : words[1],
        rus: words[2].length === 0 ? 'n/a' : words[2],
      };
    });
    console.log(processedData2);
    fs.writeFile('./data/vocabulary3.json', JSON.stringify(processedData2));
  });
};

read();
