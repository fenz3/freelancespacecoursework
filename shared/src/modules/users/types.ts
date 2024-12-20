export type UserDTO = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  profession?: string;
  photoUrl?: string;
  portfolioItems?: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type SignInRequestDTO = {
  email: string;
  password: string;
};

export type SignUpRequestDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type UserPatchRequestDTO = {
  firstName: string;
  lastName: string;
  profession: string;
  photoUrl: File | string;
  portfolioItems?: File[] | string[];
};

export type AuthResponseDTO = {
  token: string;
  user: UserDTO;
};
