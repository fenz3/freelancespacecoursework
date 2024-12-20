export type CategoryDTO = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SubcategoryDTO = {
  id: number;
  name: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};
