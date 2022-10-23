import { Dispatch, SetStateAction, useState } from 'react';

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
  const [isShowWord1, setShowWord1] = useState<boolean>(true);
  const [isShowWord2, setShowWord2] = useState<boolean>(false);
  const [isShowWord3, setShowWord3] = useState<boolean>(false);

  const showWordHandler = (setShow: Dispatch<SetStateAction<boolean>>) => () => setShow(true);
  const clickPreviousHandler = () => {
    onClickPrevious();
    setShowWord2(false);
    setShowWord3(false);
  };
  const clickCheckHandler = () => {
    onClickCheck();
    setShowWord2(false);
    setShowWord3(false);
  };
  const clickNextHandler = () => {
    onClickNext();
    setShowWord2(false);
    setShowWord3(false);
  };

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
