import Head from 'next/head';
import { useEffect, useState } from 'react';
import fs from 'fs/promises';
import { Card } from 'components';
import { useMainContext } from 'contexts';
import styles from '../styles/Home.module.css';
import { getVocabulary } from 'utils/helpers';
import { TLang, TVocabulary, TWordSet } from 'types';
import { NextPage } from 'next';
import { api as apiRoute } from 'routes';
import { getRandomInt, getRandomUniqIntArray } from 'utils/randoms';

interface ICardsProps {
  vocabulary: {
    allIDs: string[];
    byId: { [id: string]: { [key in TLang]: string } };
  };
}

// export default function
const Home: NextPage<ICardsProps> = () => {
  const [currentCardNumber, setCurrentCarnNumber] = useState<number>(0);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const [wordsList, setWordsList] = useState<TVocabulary | null>(null);
  const [randomWorsdIds, setRandomWordsIds] = useState<string[]>([]);
  const [randomWords, setRandomWords] = useState<TWordSet[]>([]);

  const { mainLang, setMainLang } = useMainContext();
  const onClickNext = () => {
    const nextCardNumber = currentCardNumber + 1;
    if (nextCardNumber >= wordsList.allIDs.length) return;
    setCurrentCarnNumber(currentCardNumber + 1);
  };
  const onClickCheck = () => console.log('check');
  const onClickPrevious = () => {
    if (currentCardNumber === 0) return;
    setCurrentCarnNumber(currentCardNumber - 1);
  };

  useEffect(() => {
    getVocabulary()
      .then((vocabulary) => {
        console.log('vocabulary', vocabulary);
        setWordsList(vocabulary);
      })
      .catch((error) => {
        console.error('Error when fetching words: ' + error);
      });
    //     setWordsList(null);})
    // fetch(apiRoute.words())
    //   .then((res) => res.json())
    //   .then((vocabulary: TVocabulary) => {
    //     console.log('vocabulary', vocabulary);
    //     setWordsList(vocabulary);
    //   })
    //   .catch((error) => {
    //     console.error('Error when fetching words: ' + error);
    //     setWordsList(null);
    //   });
  }, []);

  useEffect(() => {
    if (!wordsList) return;
    const ids = wordsList.allIDs;
    setCurrentCardId(ids[currentCardNumber]);
  }, [wordsList, currentCardNumber]);

  useEffect(() => {
    if (!wordsList) return;
    const randomIds = getRandomUniqIntArray(0, wordsList.allIDs.length - 1, 4).map((index) => {
      // console.log(index);
      return wordsList.allIDs[index];
    });
    console.log('randomIds1', randomIds);
    if (!!currentCardId && !randomIds.includes(currentCardId)) {
      const randI = getRandomInt(0, 3);
      // console.log(randI, currentCardId);
      randomIds[randI] = currentCardId;
    }
    // console.log('randomIds2', randomIds);
    const randomWords = randomIds.map((id) => wordsList.byId[id]);
    // console.log(randomwords);
    // setRandomWordsIds(randomIds);
    setRandomWords(randomWords);
  }, [wordsList, currentCardId]);

  // console.log('currentCardId', currentCardId);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Cards for learning languages" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.select}>
          <button onClick={() => setMainLang('srb')}>SRB</button>
          <button onClick={() => setMainLang('eng')}>ENG</button>
          <button onClick={() => setMainLang('ru')}>RUS</button>
        </div>
        {!!wordsList && !!currentCardId && (
          <Card
            wordSet={wordsList.byId[wordsList.allIDs[currentCardNumber]]}
            onClickCheck={onClickCheck}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
            randomWordsIds={randomWorsdIds}
            randomWords={randomWords}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
// export const getStaticProps = async () => {
//   const vocabularyData = await fs.readFile('data/vocabulary2.json', 'utf-8');
//   const parsedVocabulary = JSON.parse(vocabularyData);
//   return {
//     props: {
//       vocabulary: parsedVocabulary,
//     },
//   };
// };
