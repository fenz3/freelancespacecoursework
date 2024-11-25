import { AttributeDto, SelectOption } from '~/common/types/types';

const getOptions = (attributes: AttributeDto[]): SelectOption<string>[] =>
  attributes.map((attribute) => ({
    label: attribute.name,
    value: attribute.name,
  }));

export { getOptions };
