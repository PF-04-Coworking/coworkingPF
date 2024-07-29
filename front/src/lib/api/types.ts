export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  country?: string;
  city?: string;
  age?: number;
}

export interface IAddOfficeData {
  name: string;
  address: string;
  phone: string;
  email: string;
}
