import cn from 'classnames';
import { IWordsListElementProps } from './WordsListElementProps';
import styles from './WordsListElement.module.scss';
import { useEffect, useState } from 'react';
export const WordsListElement: React.FC<IWordsListElementProps> = ({
  id,
  words: { tur, eng, rus },
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newWords, setNewWords] = useState<{ tur: string; eng: string; rus: string }>({
    tur,
    eng,
    rus,
  });

  const confirmEditingHandler = () => {
    if (newWords.eng === eng && newWords.rus === rus && newWords.tur === tur) {
      setIsEditing(false);
      return;
    }

    try {
      onEdit(id, newWords);
    } catch (error) {
      console.log(`Editing word id ${id} error: ${error}`);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={cn(styles.item, isEditing ? styles.editing : null)}>
        <div className={styles.item__controls}>
          <button onClick={() => setIsEditing(true)}>e</button>
          <button onClick={() => setIsEditing(false)}>x</button>
          <button onClick={confirmEditingHandler}>c</button>
        </div>
        <div className={styles.item__elements}>
          {!isEditing && <div className={styles.item__element}>{tur}</div>}
          {isEditing && (
            <input
              className={styles.item__input}
              defaultValue={tur}
              onChange={(event) =>
                setNewWords((prev) => ({ ...prev, tur: event.target.value }))
              }
            ></input>
          )}
        </div>

        <div className={styles.item__elements}>
          {!isEditing && <div className={styles.item__element}>{eng}</div>}
          {isEditing && (
            <input
              className={styles.item__input}
              defaultValue={eng}
              onChange={(event) =>
                setNewWords((prev) => ({ ...prev, eng: event.target.value }))
              }
            ></input>
          )}
        </div>
        <div className={styles.item__elements}>
          {!isEditing && <div className={styles.item__element}>{rus}</div>}
          {isEditing && (
            <input
              className={styles.item__input}
              defaultValue={rus}
              onChange={(event) =>
                setNewWords((prev) => ({ ...prev, rus: event.target.value }))
              }
            ></input>
          )}
        </div>
      </div>
    </div>
  );
};
