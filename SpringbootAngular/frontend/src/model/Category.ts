export class Category {
  id: number;
  nameCate: string;
  createDate: string;

  constructor(id?: number, nameCate?: string, createDate?: string) {
    this.id = id;
    this.nameCate = nameCate;
    this.createDate = createDate;
  }
}
