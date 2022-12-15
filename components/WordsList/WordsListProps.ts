export interface IWordsListProps {
  children?: React.ReactNode;
  wordsList: {
    allIDs: string[];
    byId: { [id: string]: any };
  } | null;
  onEdit?: (id: string, data: { tur: string; eng: string; rus: string }) => Promise<boolean>;
}
