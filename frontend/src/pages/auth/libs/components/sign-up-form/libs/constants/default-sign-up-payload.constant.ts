import { SignUpRequestDTO } from '~/common/types/types';

type SignUpFormFields = SignUpRequestDTO & {
  confirmPassword: string;
};

const DEFAULT_SIGN_UP_PAYLOAD: SignUpFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD, type SignUpFormFields };
