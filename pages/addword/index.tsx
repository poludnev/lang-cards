import { Button, WordsList } from 'components';
import { useEffect, useState } from 'react';
import styles from 'styles/Addword.module.scss';
import {
  addDocumentById,
  getAllDocuments,
  getDatabyFieldValue,
  getDocument,
  updateDocument,
} from 'utils/firebase';

import vocab from 'data/vocabulary2.json';

const AddNewWordPage = () => {
  const [feedback, setFeedback] = useState<{ [id: string]: any } | null>(null);
  const [wordsList, setWordsList] = useState<{
    allIDs: string[];
    byId: { [id: string]: any };
  } | null>(null);

  const vocabularyCollection = 'testVocad';

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const { rus, tur, eng } = event.currentTarget;

    if (rus.value.length + tur.value.length + eng.value.length === 0) return; //TODO: handle empty forms

    try {
      const data = {
        rus: rus.value.length === 0 ? 'n/a' : rus.value,
        tur: tur.value.length === 0 ? 'n/a' : tur.value,
        eng: eng.value.length === 0 ? 'n/a' : eng.value,
      };
      await addDocumentById(vocabularyCollection, data.tur + '-' + Date.now(), data);
      const feedback = await getDatabyFieldValue(vocabularyCollection, 'tur', tur.value);
      console.log(feedback);
      setFeedback(feedback);
    } catch (error) {
      console.error('Handling form submit error: ' + JSON.stringify(error));
    }
  };

  const updateVocabElementHandler = async (
    id: string,
    data: { tur: string; eng: string; rus: string },
  ) => {
    try {
      await updateDocument(vocabularyCollection, id, data);
      setWordsList((prev) => ({ ...prev, byId: { ...prev.byId, [id]: data } }));
      return true;
    } catch (error) {
      console.error(`Error what updating id: ${id} widh data: ${data}`);
      return false;
    }
  };

  useEffect(() => {
    getAllDocuments(vocabularyCollection).then((data) => {
      const allIDs = Object.keys(data);
      setWordsList({ allIDs, byId: data });
    });
  }, []);

  const add = () => {
    const a = Promise.all(
      vocab.map((word) =>
        addDocumentById('testVocad', word.tur.split(' ').join('-') + '-' + Date.now(), word),
      ),
    );
    a.then((res) => console.log('res', res));
  };
  return (
    <div className={styles.container}>
      <button onClick={add}>ADD</button>
      <div className={styles.adder}>
        <form onSubmit={submitFormHandler} className={styles.form}>
          <div className={styles.form__input_group}>
            <label htmlFor="" className={styles.form__label}>
              Turkish
            </label>
            <input name="tur" type="text" className={styles.form__input} />
          </div>
          <div className={styles.form__input_group}>
            <label htmlFor="" className={styles.form__label}>
              English
            </label>
            <input name="eng" type="text" className={styles.form__input} />
          </div>
          <div className={styles.form__input_group}>
            <label htmlFor="" className={styles.form__label}>
              Russian
            </label>
            <input name="rus" type="text" className={styles.form__input} />
          </div>
          <div className={styles.form__controls}>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
      <div className={styles.feedback}>
        {feedback &&
          Object.keys(feedback).map((id) => (
            <div key={id} className={styles.feedback__item}>
              <div className={styles.feedback__item_element}>{feedback[id].tur}</div>
              <div className={styles.feedback__item_element}>{feedback[id].rus}</div>
              <div className={styles.feedback__item_element}>{feedback[id].eng}</div>
            </div>
          ))}
      </div>
      <WordsList wordsList={wordsList} onEdit={updateVocabElementHandler} />
    </div>
  );
};

export default AddNewWordPage;
