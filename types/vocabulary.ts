export type TLang = 'tur' | 'eng' | 'rus';

export type TWordSet = {
  [key in TLang]: string;
};

export type TFilterState = {
  [key in TLang]: string | null;
};
export type TVocabularyById = { [id: string]: TWordSet };

export type TVocabulary = {
  allIDs: string[];
  byId: TVocabularyById;
};
