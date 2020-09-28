
export class AccountModel{
  id: number;
  accountNumber: number;
  balance: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  address: string;
  employer: string;
  email: string;
  city: string;
  state: string;
}
export enum Accounts
{
  AccountNumber,
  Balance,
  Firstname,
  Lastname,
  Age,
  Address,
  Employer,
  Email,
  City,
  State,
}

