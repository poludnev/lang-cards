import { Dispatch } from 'react';
import { TFilterState } from 'types';

export interface ISearchFilterProps {
  children?: React.ReactNode;
  filterState: TFilterState;
  initialFilterState: TFilterState;
  setFilterState: Dispatch<TFilterState>;
}
