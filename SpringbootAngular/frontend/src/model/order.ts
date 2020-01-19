import {User} from './model.user';

export class Order {
  id: number;
  notes: string;
  orderCode: string;
  userId: number;
  lastName: string;
  firstName: string;
  address: string;
  phoneNumber: string;
  city: string;

  // tslint:disable-next-line:max-line-length
  constructor(id?: number, notes?: string, orderCode?: string, userId?: number, lastName?: string, firstName?: string, address?: string, phoneNumber?: string, city?: string) {
    this.id = id;
    this.notes = notes;
    this.orderCode = orderCode;
    this.userId = userId;
    this.lastName = lastName;
    this.firstName = firstName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.city = city;
  }

}
