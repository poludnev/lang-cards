export type TLang = 'tur' | 'eng' | 'rus';
export type TFilterState = {
  [key in TLang]: string | null;
};
