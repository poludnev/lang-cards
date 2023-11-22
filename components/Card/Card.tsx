import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import cn from 'classnames';
import { useMainContext } from 'contexts';
import { ICardProps } from './CardProps';
import styles from './Card.module.scss';
import { TLang } from 'types';
export const Card: React.FC<ICardProps> = ({
  wordSet,
  onClickCheck,
  onClickNext,
  onClickPrevious,
  randomWords = [],
}) => {
  const { mainLang } = useMainContext();

  const [isShowWord1, setShowWord1] = useState<boolean>(mainLang === 'srb');
  const [isShowWord2, setShowWord2] = useState<boolean>(mainLang === 'eng');
  const [isShowWord3, setShowWord3] = useState<boolean>(mainLang === 'ru');
  const [clickedWordsIds, setClickedWordsIds] = useState<number[]>([]);
  const [corectWordId, setCorrectWordId] = useState<number | null>(null);
  const [checkWordsLang, setCheckWordsLang] = useState<TLang>('eng');

  const showWordHandler = (setShow: Dispatch<SetStateAction<boolean>>) => () => setShow(true);

  const clickPreviousHandler = () => {
    onClickPrevious();
    setShowWord1(mainLang === 'srb');
    setShowWord2(mainLang === 'eng');
    setShowWord3(mainLang === 'ru');
    setClickedWordsIds([]);
    setCorrectWordId(null);
  };
  const clickCheckHandler = () => {
    onClickCheck();
    setShowWord1(mainLang === 'srb');
    setShowWord2(mainLang === 'eng');
    setShowWord3(mainLang === 'ru');
    setClickedWordsIds([]);
    setCorrectWordId(null);
  };
  const clickNextHandler = () => {
    onClickNext();
    setShowWord1(mainLang === 'srb');
    setShowWord2(mainLang === 'eng');
    setShowWord3(mainLang === 'ru');
    setClickedWordsIds([]);
    setCorrectWordId(null);
  };

  const checkHandler =
    (id: number, word: string): React.MouseEventHandler<HTMLDivElement> =>
    () => {
      // console.log('check word', word);
      // console.log(mainLang);
      // if (mainLang === 'srb') {
      // console.log(word === wordSet.tur);
      // }
      setClickedWordsIds((prev) => [...prev, id]);
      setCorrectWordId((prev) => (word === wordSet.srb ? id : prev));
    };

  useEffect(() => {
    console.log('useEffect', mainLang);
    setShowWord1(mainLang === 'srb');
    setShowWord2(mainLang === 'eng');
    setShowWord3(mainLang === 'ru');
    setClickedWordsIds([]);
    setCorrectWordId(null);
  }, [mainLang]);

  // console.log(mainLang, isShowWord1, isShowWord2, isShowWord3);
  // console.log(wordSet.tur);

  return (
    <div className={styles.container}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardHeading}>New card</h3>
        <p>Some card description</p>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.language}>{'Serbian'}</p>
        <div>
          {isShowWord1 ? (
            <p className={styles.value}>{wordSet.srb}</p>
          ) : (
            <p className={styles.hide} onClick={showWordHandler(setShowWord1)}>
              press to show
            </p>
          )}
        </div>
        <p className={styles.language}>{'English'}</p>
        <div>
          {isShowWord2 ? (
            <p className={styles.value}>{wordSet.eng}</p>
          ) : (
            <p className={styles.hide} onClick={showWordHandler(setShowWord2)}>
              press to show
            </p>
          )}
        </div>
        <p className={styles.language}>{'Russian'}</p>
        <div>
          {isShowWord3 ? (
            <p className={styles.value}>{wordSet.rus}</p>
          ) : (
            <p className={styles.hide} onClick={showWordHandler(setShowWord3)}>
              press to show
            </p>
          )}
        </div>
      </div>
      {randomWords.length > 0 && wordSet && (
        <div className={styles.randomwords}>
          <div
            className={cn(
              styles.randomwords__langswitch,
              checkWordsLang === 'eng' ? styles.randomwords__langswitch__selected : null,
              mainLang !== 'srb' ? styles.randomwords__langswitch__disabled : null,
            )}
            onClick={() => setCheckWordsLang('eng')}
          >
            Engish
          </div>
          <div
            className={cn(
              styles.randomwords__langswitch,
              checkWordsLang === 'rus' ? styles.randomwords__langswitch__selected : null,
              mainLang !== 'srb' ? styles.randomwords__langswitch__disabled : null,
            )}
            onClick={() => setCheckWordsLang('rus')}
          >
            Russian
          </div>
          {randomWords.map((wordSet, index) => (
            <div
              key={wordSet.srb + index}
              onClick={checkHandler(index, wordSet.srb)}
              className={cn(
                styles.randomwords__item,
                clickedWordsIds.includes(index) ? styles.randomwords__item_clicked : null,
                corectWordId === index ? styles.randomwords__item_correct : null,
              )}
            >
              {mainLang === 'srb' ? wordSet[checkWordsLang] : wordSet.srb}
            </div>
          ))}
        </div>
      )}
      <div className={styles.cardFooter}>
        <button onClick={clickPreviousHandler}>Previous</button>
        <button onClick={clickCheckHandler}>Check</button>
        <button onClick={clickNextHandler}>Next</button>
      </div>
    </div>
  );
};
