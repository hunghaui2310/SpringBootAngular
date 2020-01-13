export class Sort {
  condition: string;
  value: string;
}

export const sort: Sort[] = [
  {
    condition: 'Lượt mua',
    value: 'NUM_BUY'
  },
  {
    condition: 'Lượt thích',
    value: 'NUM_LIKE'
  },
  {
    condition: 'Giá tăng dần',
    value: 'PRICE_ASC'
  },
  {
    condition: 'Giá giảm dần',
    value: 'PRICE_DESC'
  },
  {
    condition: 'Mới ra mắt',
    value: 'CREATE_DATE'
  },
  {
    condition: 'Tên (A- Z)',
    value: 'NAME'
  }
];
