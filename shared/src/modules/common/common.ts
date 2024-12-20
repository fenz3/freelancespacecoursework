type PaginationQueryParameters = {
  page: number;
  pageSize: number;
};

export { type PaginationQueryParameters };

type GetAllRequestDTO = {
  name: string;
} & PaginationQueryParameters;

export { type GetAllRequestDTO };
