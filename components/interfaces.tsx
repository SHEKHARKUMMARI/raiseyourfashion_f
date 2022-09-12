export type Category = {
  Id: number;
  Name: string;
};
export type Feedback = {
  Rating?: number;
  Reviews?: string;
};
export type Product = {
  Id: number;
  Name: string;
  Url: string;
  Price: number;
  CategoryId: number;
  Quantity: number;
  Description: string;
  Feedback: Feedback;
  SellerId: number;
};
export interface LoginDataBase {
  password: string;
}
export interface LoginWithEmail extends LoginDataBase {
  email: string;
}
