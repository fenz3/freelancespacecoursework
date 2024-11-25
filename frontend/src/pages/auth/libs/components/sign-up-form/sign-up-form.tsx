import {
  SignUpRequestDto,
  signUpRequestSchemaFront,
} from '~/common/types/types.js';
import { DEFAULT_SIGN_UP_PAYLOAD } from './libs/constants/constants.js';
import styles from './styles.module.css';
import { useAppForm } from '~/hooks/hooks.js';
import { useState } from 'react';
import { Button, IconButton, Input, Link } from '~/components/components.js';
import { AppPath } from '~/common/enums/enums.js';
import { SignUpFormFields } from './libs/constants/default-sign-up-payload.constant.js';
import RadioInput from '~/components/radio-input/radio-input.js';

type Properties = {
  onSubmit: (payload: SignUpRequestDto) => void;
};

const SignUpForm = ({ onSubmit }: Properties): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<SignUpFormFields>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: signUpRequestSchemaFront,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: SignUpFormFields) => {
    const { confirmPassword: _confirmPassword, ...dataWithoutConfirmPassword } = formData;
    onSubmit(dataWithoutConfirmPassword);
    })(event_);
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((previousState) => !previousState);
  };

  const roleOptions = [{
    label: "Hire for a project",
    value: "CLIENT"
  },
  {
    label: "Work as a freelancer",
    value: "FREELANCER"
  },
]

  return (
    <form
      className={styles['form-wrapper']}
      noValidate
      onSubmit={handleFormSubmit}
    >
      <p className={styles['form-text']}>
        Have an account? <Link to={AppPath.SIGN_IN}>Log in</Link>
      </p>
      <div className={styles['name-inputs']}>
      <Input
        autoComplete="given-name"
        control={control}
        errors={errors}
        label="First Name"
        name="firstName"
        type="text"
      />
      <Input
        autoComplete="given-name"
        control={control}
        errors={errors}
        label="Last Name"
        name="lastName"
        type="text"
      />
      </div>
      <Input
        autoComplete="email"
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
      <div className={styles['password-container confirm-password-container']}>
        <Input
          autoComplete="one-time-code"
          control={control}
          errors={errors}
          label="Confirm password"
          name="confirmPassword"
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
      <RadioInput 
      label="I want to"
      name="role"
      control={control}
      errors={errors}
      options={roleOptions}
      />
      <Button label="Create Account" type="submit" />
    </form>
  );
};

export { SignUpForm };
