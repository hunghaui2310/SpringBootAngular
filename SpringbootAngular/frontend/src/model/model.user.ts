export class User {
  id: number;
  username = '';
  password = '';
  fullName = '';

  constructor(id?: number, username?: string, password?: string, fullName?: string){
    this.id = id;
    this.username = username;
    this.password = password;
    this.fullName = fullName;
  }

}
