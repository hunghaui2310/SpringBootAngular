export class CommentModel {
  id: number;
  userId: number;
  productId: number;
  blogId: number;
  content: string;
  status: number;
  createDate: string;
  userName: string;

  constructor(id?: number, userId?: number, productId?: number, blogId?: number, content?: string, status?: number, createDate?: string, userName?: string) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.blogId = blogId;
    this.content = content;
    this.status = status;
    this.createDate = createDate;
    this.userName = userName;
  }
}
