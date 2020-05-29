import {User} from './model.user';

export class Order {
  id: number;
  note: string;
  orderCode: string;
  lastName: string;
  firstName: string;
  address: string;
  phoneNumber: string;
  email: string;
  createDate: string;
  payment: number;
  userId: number;
  nameOrder: string;

  constructor(id?: number, note?: string, orderCode?: string,
              lastName?: string, firstName?: string,
              address?: string, phoneNumber?: string, email?: string, createDate?: string, payment?: number, userId?: number,
              nameOrder?: string) {
    this.id = id;
    this.note = note;
    this.orderCode = orderCode;
    this.lastName = lastName;
    this.firstName = firstName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.createDate = createDate;
    this.payment = payment;
    this.userId = userId;
    this.nameOrder = nameOrder;
  }

}
