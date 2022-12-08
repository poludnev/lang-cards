import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMainContext } from 'contexts';
import { ICardProps } from './CardProps';
import styles from './Card.module.scss';
export const Card: React.FC<ICardProps> = ({
  lang1,
  lang2,
  lang3,
  word1,
  word2,
  word3,
  onClickCheck,
  onClickNext,
  onClickPrevious,
}) => {
  const { mainLang } = useMainContext();

  console.log(
    'mainLang',
    mainLang,
    mainLang === 'turk',
    mainLang === 'eng',
    mainLang === 'ru',
  );

  const [isShowWord1, setShowWord1] = useState<boolean>(mainLang === 'turk');
  const [isShowWord2, setShowWord2] = useState<boolean>(mainLang === 'eng');
  const [isShowWord3, setShowWord3] = useState<boolean>(mainLang === 'ru');

  const showWordHandler = (setShow: Dispatch<SetStateAction<boolean>>) => () => setShow(true);
  const clickPreviousHandler = () => {
    onClickPrevious();
    setShowWord1(mainLang === 'turk');
    setShowWord2(mainLang === 'eng');
    setShowWord3(mainLang === 'ru');
  };
  const clickCheckHandler = () => {
    onClickCheck();
    setShowWord1(mainLang === 'turk');
    setShowWord2(mainLang === 'eng');
    setShowWord3(mainLang === 'ru');
  };
  const clickNextHandler = () => {
    onClickNext();
    setShowWord1(mainLang === 'turk');
    setShowWord2(mainLang === 'eng');
    setShowWord3(mainLang === 'ru');
  };

  useEffect(() => {
    console.log('useEffect', mainLang);
    setShowWord1(mainLang === 'turk');
    setShowWord2(mainLang === 'eng');
    setShowWord3(mainLang === 'ru');
  }, [mainLang]);

  console.log(mainLang, isShowWord1, isShowWord2, isShowWord3);

  return (
    <div className={styles.container}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardHeading}>New card</h3>
        <p>Some card description</p>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.language}>{lang1}</p>
        <div>
          {isShowWord1 ? (
            <p className={styles.value}>{word1}</p>
          ) : (
            <p className={styles.hide} onClick={showWordHandler(setShowWord1)}>
              press to show
            </p>
          )}
        </div>
        <p className={styles.language}>{lang2}</p>
        <div>
          {isShowWord2 ? (
            <p className={styles.value}>{word2}</p>
          ) : (
            <p className={styles.hide} onClick={showWordHandler(setShowWord2)}>
              press to show
            </p>
          )}
        </div>
        <p className={styles.language}>{lang3}</p>
        <div>
          {isShowWord3 ? (
            <p className={styles.value}>{word3}</p>
          ) : (
            <p className={styles.hide} onClick={showWordHandler(setShowWord3)}>
              press to show
            </p>
          )}
        </div>
      </div>
      <div className={styles.cardFooter}>
        <button onClick={clickPreviousHandler}>Previous</button>
        <button onClick={clickCheckHandler}>Check</button>
        <button onClick={clickNextHandler}>Next</button>
      </div>
    </div>
  );
};
