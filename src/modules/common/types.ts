export interface Entity {
  id: string;
  loading: boolean;
}

export interface ById<T> {
  entities: { [key: string]: T };
}

export interface AllIds {
  result: string[];
}
