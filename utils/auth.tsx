import { NextPageContext } from "next";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { ACCESS_TOKEN } = publicRuntimeConfig;
const getCookies = (ctx: NextPageContext, cookieName: string) => {
  return parseCookies(ctx)[cookieName];
};
export const isLoggedIn = (ctx?: NextPageContext): boolean => {
  let cookie = null;

  if (ctx) {
    cookie = getCookies(ctx, ACCESS_TOKEN);
  } else {
    cookie = Cookies.get(ACCESS_TOKEN);
  }
  return Boolean(cookie);
};
