// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../components/interfaces";
import { products } from "../../database";
const getAllProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  // console.log("products=",products);
  try {
    // axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    const request = await axios.get("http://localhost:10000/products");
    request.data.map((ele: any) => {
      ele.Image = "data:image/png;base64," + ele.Image;
    });
    console.log("response here===", request.data);
    res.status(200).json(request.data);
  } catch (error: any) {
    console.log("error in produvct===", error);
    const statusCode = error?.status;

    const response = error?.data || {
      message: "Unexpected error during login!",
    };
    return res.status(statusCode || 500).json(response);
  }
};
export default getAllProducts;
