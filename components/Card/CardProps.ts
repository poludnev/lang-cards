import { TWordSet } from 'types';
export interface ICardProps {
  children?: React.ReactNode;
  wordSet: TWordSet;
  onClickPrevious: () => void;
  onClickCheck: () => void;
  onClickNext: () => void;
  randomWordsIds?: string[];
  randomWords: TWordSet[];
}
