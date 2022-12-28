export interface Provider {
  connect(table?: string): Promise<any | null>;
  readOne<T>(collection: string, key: string): Promise<T | null>;
  readAll<T>(collection: string): Promise<T[] | null>;
  readKeyList(collection: string): Promise<string[]>;
  insert<T>(collection: string, dbkey: string, payload: T): Promise<T | null>;
  remove<T>(collection: string, key: string): Promise<boolean>;
}
