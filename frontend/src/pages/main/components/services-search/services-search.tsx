import { useNavigate } from 'react-router-dom';
import { QueryParameterName } from '~/common/enums/app/app';
import { AppPath } from '~/common/enums/enums';
import { Button, Icon, Input } from '~/components/components';
import { configureQueryString } from '~/helpers/helpers';
import { useAppForm } from '~/hooks/hooks';
import styles from './styles.module.css';

type Properties = {
  isLabelHidden: boolean;
  label: string;
  placeholder: string;
};

const ServicesSearch = ({
  isLabelHidden,
  label,
  placeholder,
}: Properties): JSX.Element => {
  const navigate = useNavigate();

  const { control, errors, handleSubmit } = useAppForm<{ search: string }>({
    defaultValues: { search: '' },
  });

  const handleSearch = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: { search: string }) => {
      if (formData.search.trim()) {
        const skillsRoute = configureQueryString(AppPath.SKILLS, [
          [QueryParameterName.SEARCH, formData.search],
        ]);
        navigate(skillsRoute);
      }
    })(event_);
  };

  return (
    <div className={styles['search-container']}>
      <form onSubmit={handleSearch} className={styles['search-form']}>
        <div className={styles['search-input']}>
          <Input
            control={control}
            errors={errors}
            isLabelHidden={isLabelHidden}
            label={label}
            leftIcon={<Icon height={20} name="search" width={20} />}
            name="search"
            placeholder={placeholder}
            type="search"
          />
        </div>
        <div className={styles['search-button']}>
          <Button type="submit" label="Search" />
        </div>
      </form>
    </div>
  );
};

export { ServicesSearch };
