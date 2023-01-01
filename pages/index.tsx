import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import Layout from "../components/layout";
import axios from "axios";
import { Image } from "@chakra-ui/react";
import ProductCard from "../components/product";
// import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from "../components/carousels/carousel";
// import { Product } from "../components/interfaces";
const Home: NextPage = (props: any) => {
  const { products } = props;
  console.log('products===',products);
  return (
    <>
      <Head>
        <title>RaiseYourFashion</title>
        <meta
          name="description"
          content="buy products at lowest as it possible"
        />
      </Head>
      <Carousel products={products} />
      {/* <Box mt="20px" ml="20px" mr="20px" display="flex" flexWrap="wrap"> */}
      <SimpleGrid columns={2} spacing={10}>
        {products?.map((ele: any) => {
          // eslint-disable-next-line react/jsx-key
          return <ProductCard data={ele} />;
        })}
      </SimpleGrid>
    </>
  );
};
export async function getServerSideProps() {
  let products: any;
  try {
    const request = await axios.get("http://localhost:10000/products");
    request.data.map((ele: any) => {
      ele.Image = "data:image/png;base64," + ele.Image;
    });
    products = request?.data;
  } catch (err) {
    products = [];
  }
  return {
    props: { products }, // will be passed to the page component as props
  };
}

export default Home;
