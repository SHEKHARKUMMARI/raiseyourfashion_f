import type { NextPage } from "next";
import Head from "next/head";
import { Box, Divider, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import Layout from "../components/layout";
import axios from "axios";
import { Image } from "@chakra-ui/react";
import Product from "../components/product";
import Product1 from "../components/product1";
// import Image from "next/image";
import { useEffect, useState } from "react";
const Home: NextPage = ({}: any) => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fun = async () => {
      const dt = await axios.get("./api/getallproducts");
      if (dt) {
        setData(dt);
        console.log("dt");
      }
    };
    fun();
  }, []);
  useEffect(() => {
    console.log("data=", data?.data[0]?.Url);
  });
  return (
    <>
      <Head>
        <title>RaiseYourFashion</title>
        <meta
          name="description"
          content="buy products at lowest as it possible"
        />
      </Head>
      <Flex mt="20px" ml="20px" mr="20px">
        {data &&
          data?.data?.map((ele: any) => {
            // eslint-disable-next-line react/jsx-key
            return (
              <>
                <Product1 data={ele} />
              </>
            );
          })}
      </Flex>
      {/* <Product/> */}
      {/* <ProductAddToCart /> */}
    </>
  );
};
// export async function getServerSideProps(context) {
//    const data=await axios.get('https://localhost:3000/pages/api/getallproducts');
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

export default Home;
