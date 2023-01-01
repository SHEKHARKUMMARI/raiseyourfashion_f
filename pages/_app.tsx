import "../styles/globals.css";
import type { AppProps } from "next/app";
// pages/_app.js
import Layout from "../components/layout";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider  >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
