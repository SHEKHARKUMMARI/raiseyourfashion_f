export type Category = {
  Id: number;
  Name: string;
};
export type Feedback = {
  Rating?: number;
  Reviews?: string;
};
export type Product = {
  Product_id: number;
  Name: string;
  Description: string;
  Image: string;
  Rate: number;
  In_stock:number;
  Ratings_and_reviews:string;
  Seller: number;
  Categories: number;
};
export interface LoginDataBase {
  password: string;
}
export interface LoginWithEmail extends LoginDataBase {
  email: string;
}
