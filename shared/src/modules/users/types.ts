export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SignInRequestDto = {
  email: string;
  password: string;
};

export type SignUpRequestDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type AuthResponseDto = {
  token: string;
  user: UserDto;
};
