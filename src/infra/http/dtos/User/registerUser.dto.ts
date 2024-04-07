export interface RegisterUserDTO {
  name: string;
  email: string;
  phone: string;
  password: string;
  birthDay: Date;
  photo: string | null;
  address?: {
    cep: string;
    complement?: string;
    number?: string;
  };
}
