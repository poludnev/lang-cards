import cn from 'classnames';
import { ISearchFilterProps } from './SearchFilterProps';
import styles from './SearchFilter.module.scss';
import { useEffect, useState } from 'react';
import { TLang } from 'types';

export const SearchFilter: React.FC<ISearchFilterProps> = ({
  initialFilterState,
  filterState,
  setFilterState,
}) => {
  const inputChangeHadnler =
    (type: TLang): React.ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      setFilterState({ ...initialFilterState, [type]: event.target.value });
    };

  return (
    <div className={styles.container}>
      <div className={cn(styles.item)}>
        <div className={styles.item__controls}>
          <button onClick={() => setFilterState(initialFilterState)}>clear</button>
        </div>
        <div className={styles.item__elements}>
          <input
            className={styles.item__input}
            value={filterState.srb ? filterState.srb : ''}
            onChange={inputChangeHadnler('srb')}
          ></input>
        </div>

        <div className={styles.item__elements}>
          <input
            className={styles.item__input}
            onChange={inputChangeHadnler('eng')}
            value={filterState.eng ? filterState.eng : ''}
          ></input>
        </div>
        <div className={styles.item__elements}>
          <input
            className={styles.item__input}
            onChange={inputChangeHadnler('rus')}
            value={filterState.rus ? filterState.rus : ''}
          ></input>
        </div>
      </div>
    </div>
  );
};
