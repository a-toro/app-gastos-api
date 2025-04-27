export interface Repository<T> {
  create(model: T): void;
  getById(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: number, model: Partial<T>): void;
  delete(id: number): void;
}
