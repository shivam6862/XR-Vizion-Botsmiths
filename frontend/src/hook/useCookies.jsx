import { setCookie, deleteCookie, getCookie } from "cookies-next";
const ISLOGGEDIN_COOKIE_NAME = "isLogged";

export const useCookies = () => {
  const setIsLoggedInCookie = (value) => {
    setCookie(ISLOGGEDIN_COOKIE_NAME, value);
  };
  const fetchIsLoggedInCookies = () => {
    return getCookie(ISLOGGEDIN_COOKIE_NAME);
  };
  const removeIsLoggedInCookies = () => {
    deleteCookie(ISLOGGEDIN_COOKIE_NAME);
  };

  return {
    setIsLoggedInCookie,
    fetchIsLoggedInCookies,
    removeIsLoggedInCookies,
  };
};
