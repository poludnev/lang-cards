export interface IWordsListElementProps {
  children?: React.ReactNode;
  id: string;
  words: { [id: string]: string };
  onEdit?: (id: string, data: { srb: string; eng: string; rus: string }) => void;
}
