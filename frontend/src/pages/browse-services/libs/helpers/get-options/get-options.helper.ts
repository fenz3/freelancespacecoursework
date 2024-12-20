import {
  CategoryDTO,
  SelectOption,
  SubcategoryDTO,
} from '~/common/types/types';

const getOptions = (
  attributes: CategoryDTO[] | SubcategoryDTO[]
): SelectOption<number>[] =>
  attributes.map((attribute) => ({
    label: attribute.name,
    value: attribute.id,
  }));

export { getOptions };
