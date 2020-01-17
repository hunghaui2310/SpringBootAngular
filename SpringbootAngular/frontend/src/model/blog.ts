export class Blog {
  id: number;
  title: string;
  content: string;
  createDate: string;
  img: string;
  numSee: number;

  constructor(id?: number, title?: string, content?: string, createDate?: string, img?: string, numSee?: number) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createDate = createDate;
    this.img = img;
    this.numSee = numSee;
  }
}
