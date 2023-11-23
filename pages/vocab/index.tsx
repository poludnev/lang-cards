import fs from 'fs/promises';
import { Button, SearchFilter, WordsList } from 'components';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from 'styles/Addword.module.scss';

import { api as apiRoute } from 'routes';
import { getVocabulary, updateVocabulary } from 'utils/helpers';
import { TFilterState, TLang, TVocabulary, TVocabularyById } from 'types';
import { NextPage } from 'next';

interface IVocabularyListPageProps {
  vocabulary: TVocabulary;
}

const VocabularyListPage: NextPage<IVocabularyListPageProps> = ({ vocabulary }) => {
  const [feedback, setFeedback] = useState<TVocabularyById | null>(null);
  const [wordsList, setWordsList] = useState<TVocabulary | null>(null);
  const [filteredWordsList, setFilteredWordsList] = useState<TVocabulary | null>(null);

  const initialFilterState: TFilterState = { srb: null, eng: null, rus: null };
  const [filterState, setFilterState] = useState<TFilterState>(initialFilterState);

  const srbInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name as TLang;
    console.log(name);
    setFilterState((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const { rus, srb, eng } = event.currentTarget;

    if (rus.value.length + srb.value.length + eng.value.length === 0) return;
    //TODO: handle empty forms

    // try {
    const data = {
      rus: rus.value.length === 0 ? 'n/a' : rus.value,
      srb: srb.value.length === 0 ? 'n/a' : srb.value,
      eng: eng.value.length === 0 ? 'n/a' : eng.value,
    };
    const newWordID = data.srb + '-' + Date.now();

    console.log(wordsList);

    const byId = wordsList.byId;
    const allIDs = wordsList.allIDs;

    allIDs.push(newWordID);
    console.log(byId[newWordID], data);
    byId[newWordID] = data;
    const updatedWordsList: TVocabulary = {
      allIDs: allIDs.sort((a, b) => a.localeCompare(b)),
      byId,
    };
    updateVocabulary(updatedWordsList)
      .then(() => {
        setFeedback({ [newWordID]: data });
        setWordsList(updatedWordsList);
        rus.value = '';
        srb.value = '';
        eng.value = '';
      })
      .catch((error) => {
        console.error('Handling form submit error: ' + JSON.stringify(error));
      });
  };

  const updateVocabElementHandler = async (
    id: string,
    data: { srb: string; eng: string; rus: string },
  ) => {
    const newWordID = data.srb + '-' + Date.now();
    // try {
    const allIDs = wordsList.allIDs.filter((el) => el !== id);
    const byId = wordsList.byId;
    byId[newWordID] = data;
    delete byId[id];
    allIDs.push(newWordID);

    const updatedWordsList: TVocabulary = {
      allIDs: allIDs.sort((a, b) => a.localeCompare(b)),
      byId,
    };

    updateVocabulary(updatedWordsList)
      .then(() => {
        setWordsList(updatedWordsList);
      })
      .catch((error) => {
        console.error('Handling form submit error: ' + JSON.stringify(error));
      });

    // fetch(apiRoute.words(), {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ allIDs, byId }),
    // }).then(() => {
    //   setWordsList((prev) => ({ ...prev, byId: { ...prev.byId, [id]: data } }));
    // });
    // } catch (error) {
    //   console.error(`Error while updating id: ${id} widh data: ${JSON.stringify(data)}`);
    //   return false;
    // }
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
  }, []);

  useEffect(() => {
    // console.log('filterState', filterState);
    if (!wordsList) return;

    const { byId } = wordsList;

    const filtered = wordsList.allIDs.reduce<string[]>((acc, val) => {
      if (!!filterState.srb) {
        const srb = byId[val].srb.toLowerCase();
        return !srb.match(filterState.srb) ? acc : [...acc, val];
      }

      if (!!filterState.eng) {
        const eng = byId[val].eng.toLowerCase();
        return !eng.match(filterState.eng) ? acc : [...acc, val];
      }
      if (!!filterState.rus) {
        const rus = byId[val].rus.toLowerCase();
        return !rus.match(filterState.rus) ? acc : [...acc, val];
      }

      return acc;
    }, []);

    setFilteredWordsList({ allIDs: filtered, byId: wordsList.byId });
  }, [filterState, wordsList]);

  return (
    <div className={styles.container}>
      <div className={styles.adder}>
        <form onSubmit={submitFormHandler} className={styles.form}>
          <div className={styles.form__input_group}>
            <label htmlFor="" className={styles.form__label}>
              Serbian
            </label>
            <input
              name="srb"
              type="text"
              className={styles.form__input}
              onChange={srbInputChangeHandler}
            />
          </div>
          <div className={styles.form__input_group}>
            <label htmlFor="" className={styles.form__label}>
              English
            </label>
            <input
              name="eng"
              type="text"
              className={styles.form__input}
              onChange={srbInputChangeHandler}
            />
          </div>
          <div className={styles.form__input_group}>
            <label htmlFor="" className={styles.form__label}>
              Russian
            </label>
            <input
              name="rus"
              type="text"
              className={styles.form__input}
              onChange={srbInputChangeHandler}
            />
          </div>
          <div className={styles.form__controls}>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
      {feedback && (
        <div className={styles.feedback}>
          {Object.keys(feedback).map((id) => (
            <div key={id} className={styles.feedback__item}>
              <div className={styles.feedback__item_element}>{feedback[id].srb}</div>
              <div className={styles.feedback__item_element}>{feedback[id].rus}</div>
              <div className={styles.feedback__item_element}>{feedback[id].eng}</div>
            </div>
          ))}
        </div>
      )}
      <SearchFilter
        initialFilterState={initialFilterState}
        filterState={filterState}
        setFilterState={setFilterState}
      />

      {!!filteredWordsList && filteredWordsList.allIDs.length > 0 && (
        <div className={styles.filtered}>
          <WordsList wordsList={filteredWordsList} />
        </div>
      )}
      {wordsList && <WordsList wordsList={wordsList} onEdit={updateVocabElementHandler} />}
    </div>
  );
};

export default VocabularyListPage;
