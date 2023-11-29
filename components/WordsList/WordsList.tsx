import { WordsListElement } from './WordsListElement';
import { IWordsListProps } from './WordsListProps';
import styles from './WordsList.module.scss';
import { Fragment, useEffect, useState } from 'react';
export const WordsList: React.FC<IWordsListProps> = ({ wordsList, onEdit }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wordlist}>
        {wordsList && wordsList.allIDs.length > 0 ? (
          wordsList.allIDs.map((id, index) => {
            return (
              <div key={id} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-4rem' }}>{index}</div>
                <WordsListElement onEdit={onEdit} words={wordsList.byId[id]} id={id} />
              </div>
            );
          })
        ) : (
          <div>Wordlist is empty</div>
        )}
      </div>
    </div>
  );
};
