import fs from 'fs/promises';
import { NextPage } from 'next';
import styles from 'styles/Vocab.module.css';

interface IVocabPage {
  vocabData: any[];
}
const VocabPage: NextPage<IVocabPage> = ({ vocabData }) => {
  console.log(vocabData);
  return (
    <div className={styles.container}>
      {vocabData.map((data, index) => {
        return (
          <div key={data.word1 + index} className={styles.row}>
            <div className={styles.cell}>{data.word1}</div>
            <div className={styles.cell}>{data.word2}</div>
            <div className={styles.cell}>{data.word3}</div>
          </div>
        );
      })}
    </div>
  );
};

export default VocabPage;

export const getStaticProps = async () => {
  const vocabData = await fs.readFile('data/vocabulary.json', 'utf-8');
  console.log(vocabData);
  const parsedVocabData = JSON.parse(vocabData);

  return {
    props: {
      vocabData: parsedVocabData,
    },
  };
};
