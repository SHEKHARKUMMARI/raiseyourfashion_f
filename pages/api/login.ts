// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function Loginhandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const payload = req.body;
  console.log("resp login===", payload);
  res.status(200).json({ message: "succesfully logedin" });
}
