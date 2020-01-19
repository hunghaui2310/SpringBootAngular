export class User {
  id: number;
  username = '';
  password = '';
  fullName = '';
  address = '';
  phoneNumber = '';

  constructor(id?: number, username?: string, password?: string, fullName?: string, address?: string, phoneNumber?: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

}
