import { IndexPath } from '@ui-kitten/components';

export enum QueryEnum {
  All,
  Title,
  Author,
}

export interface SearchInterface {
  text: string;
  filter: IndexPath;
}