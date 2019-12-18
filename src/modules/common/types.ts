export interface Entity {
  id: string;
  loading: boolean;
}

export interface ById<T> {
  [key: string]: T;
}

export interface AllIds {
  result: string[];
}
