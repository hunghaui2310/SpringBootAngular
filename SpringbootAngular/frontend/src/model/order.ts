import {User} from './model.user';

export class Order {
  id: number;
  note: string;
  orderCode: string;
  userId: number;
  lastName: string;
  firstName: string;
  address: string;
  phoneNumber: string;
  email: string;

  constructor(id?: number, note?: string, orderCode?: string,
              userId?: number, lastName?: string, firstName?: string,
              address?: string, phoneNumber?: string, email?: string) {
    this.id = id;
    this.note = note;
    this.orderCode = orderCode;
    this.userId = userId;
    this.lastName = lastName;
    this.firstName = firstName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }

}
