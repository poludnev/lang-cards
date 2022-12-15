import { WordsListElement } from './WordsListElement';
import { IWordsListProps } from './WordsListProps';
import styles from './WordsList.module.scss';
import { useEffect, useState } from 'react';
export const WordsList: React.FC<IWordsListProps> = ({ wordsList, onEdit }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wordlist}>
        {wordsList && wordsList.allIDs.length > 0 ? (
          wordsList.allIDs.map((id) => {
            return (
              <WordsListElement onEdit={onEdit} key={id} words={wordsList.byId[id]} id={id} />
            );
          })
        ) : (
          <div>Wordlist is empty</div>
        )}
      </div>
    </div>
  );
};
