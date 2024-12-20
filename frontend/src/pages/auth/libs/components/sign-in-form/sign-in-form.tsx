import { SignInRequestDTO, signInRequestSchema } from '~/common/types/types.js';
import { DEFAULT_SIGN_IN_PAYLOAD } from './libs/constants/constants.js';
import styles from './styles.module.css';
import { useAppForm } from '~/hooks/hooks.js';
import { useState } from 'react';
import { AppPath } from '~/common/enums/enums.js';
import { Button, IconButton, Input, Link } from '~/components/components.js';

type Properties = {
  onSubmit: (payload: SignInRequestDTO) => void;
};

const SignInForm = ({ onSubmit }: Properties): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<SignInRequestDTO>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: signInRequestSchema,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: SignInRequestDTO) => {
      onSubmit(formData);
    })(event_);
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((previousState) => !previousState);
  };

  return (
    <form
      className={styles['form-wrapper']}
      noValidate
      onSubmit={handleFormSubmit}
    >
      <p className={styles['form-text']}>
        Don&apos;t have an account? <Link to={AppPath.SIGN_UP}>Create new</Link>
      </p>
      <Input
        autoComplete="username"
        control={control}
        errors={errors}
        label="Email"
        name="email"
        type="email"
      />
      <div className={styles['password-container']}>
        <Input
          autoComplete="one-time-code"
          control={control}
          errors={errors}
          label="Password"
          name="password"
          rightIcon={
            <IconButton
              iconName={isPasswordVisible ? 'strikedEye' : 'eye'}
              label={isPasswordVisible ? 'Hide password' : 'Show password'}
              onClick={handleTogglePasswordVisibility}
            />
          }
          type={isPasswordVisible ? 'text' : 'password'}
        />
      </div>
      <Button label="Log in" type="submit" />
    </form>
  );
};

export { SignInForm };
