import Head from 'next/head';
import { useState } from 'react';

import { Card } from 'components';
import { useMainContext } from 'contexts';
import styles from '../styles/Home.module.css';

import wordSets from 'data/vocabulary.json';

export default function Home() {
  const [currentCardNumber, setCurrentCarnNumber] = useState<number>(0);

  const { mainLang, setMainLang } = useMainContext();
  const onClickNext = () => {
    const nextCardNumber = currentCardNumber + 1;
    if (nextCardNumber >= wordSets.length) return;
    setCurrentCarnNumber(currentCardNumber + 1);
  };
  const onClickCheck = () => console.log('check');
  const onClickPrevious = () => {
    if (currentCardNumber === 0) return;
    setCurrentCarnNumber(currentCardNumber - 1);
  };

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
          <button onClick={() => setMainLang('turk')}>TRK</button>
          <button onClick={() => setMainLang('eng')}>ENG</button>
          <button onClick={() => setMainLang('ru')}>RUS</button>
        </div>
        <Card
          {...wordSets[currentCardNumber]}
          onClickCheck={onClickCheck}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
        />
      </main>
    </div>
  );
}
