// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../components/interfaces";
import { products } from "../../database";
const Data: Product[] = products;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  // console.log("products=",products);
  res.send(products);
  return;
}
