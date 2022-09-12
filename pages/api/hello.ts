// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client({
    user: "shekhar",
    password: "0000",
    database: "mydb",
  });
  client.connect((error: any) => {
    if (error) console.log("error in connecting!", error);
    else {
      console.log("connected to database...");
    }
  });
  let data: any;
  client.query("SELECT*FROM test", (err: any, r: any) => {
    if (err) {
      console.log("eroor===", err);
    } else {
      data = r?.rows?.[0];
    }
    console.log("data===", data.name);
  res.status(200).json(data);

  });
}
