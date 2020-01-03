export class ApiResponse {
  code: number;
  status: boolean;
  errors: string;
  // tslint:disable-next-line:ban-types
  data: Object;
  page: number;
  pageSize: number;
  totalRow: number;
}
