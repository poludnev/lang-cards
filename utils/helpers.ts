import { TVocabulary } from 'types';
import { getDocument, updateDocument } from 'utils/firebase';

console.log('ENV', process.env.NODE_ENV);
const collectionName =
  process.env.NODE_ENV === 'production' ? 'prodCollection' : 'devCollection';
const vocabularyName =
  process.env.NODE_ENV === 'production' ? 'prodVocabulary' : 'devVocabulary';
console.log(collectionName, vocabularyName);

export const getVocabulary = async (): Promise<TVocabulary> => {
  const data = await getDocument(collectionName, vocabularyName);
  return data;
};

export const updateVocabulary = async (vocabulary: TVocabulary): Promise<void> => {
  updateDocument(collectionName, vocabularyName, vocabulary);
};
