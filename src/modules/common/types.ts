export interface Entity {
  id: string;
}

export interface ById<T> {
  [key: string]: T;
}

export interface AllIds {
  result: string[];
}
