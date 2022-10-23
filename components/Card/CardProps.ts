export interface ICardProps {
  children?: React.ReactNode;
  lang1: string;
  lang2: string;
  lang3: string;
  word1: string;
  word2: string;
  word3: string;
  onClickPrevious: () => void;
  onClickCheck: () => void;
  onClickNext: () => void;
}
