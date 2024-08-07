export class BasicResponse {
  success: Boolean = false;
  msg: String = ''
  constructor(success: boolean = true, msg: string = '') {
    this.success = success;
    this.msg = msg;
  }
}

class Pagination {
  limit: Number = 0
  offset: Number = 0
  count: Number = 0
  totalPage: Number = 0
  totalRecord: Number = 0
}

export class DataResponse extends BasicResponse {
  data: any = null
}

export class DataResponseWithPagination extends DataResponse {
  pagination: Pagination | null = null
}

module.exports = { BasicResponse, DataResponse, DataResponseWithPagination }