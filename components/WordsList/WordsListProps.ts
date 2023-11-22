export interface IWordsListProps {
  children?: React.ReactNode;
  wordsList: {
    allIDs: string[];
    byId: { [id: string]: any };
  } | null;
  onEdit?: (id: string, data: { srb: string; eng: string; rus: string }) => void;
}
