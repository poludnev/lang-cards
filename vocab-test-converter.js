// import fs from 'fs/promises';

const fs = require('fs/promises');

const read = () => {
  fs.readFile('./data/words1.csv', { encoding: 'utf-8' }).then((data) => {
    const processedData = data.split('\r\n').map((el) => {
      const words = el.split(',');
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
    console.log(processedData);
    fs.writeFile('./data/vocabulary.json', JSON.stringify(processedData));
  });
};

read();
