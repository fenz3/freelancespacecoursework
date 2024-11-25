type PaginationQueryParameters = {
  page: number;
  pageSize: number;
};

export { type PaginationQueryParameters };

type GetAllRequestDto = {
  name: string;
} & PaginationQueryParameters;

export { type GetAllRequestDto };
