export class User {
  id: number;
  username: string;
  password = '';
  fullName = '';
  address = '';
  phoneNumber = '';
  email: string;
  firstName: string;
  lastName: string;

  constructor(id?: number, username?: string, password?: string, fullName?: string, address?: string,
              phoneNumber?: string, email?: string, firstName?: string, lastName?: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

}
