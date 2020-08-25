import { useLocation } from "react-router-dom";
import { ROUTES } from "../const";

export const useIsHome = () => {
  const location = useLocation();
  console.log(location, ROUTES.HOME);
  const isHome = location.pathname === ROUTES.HOME;

  return isHome;
};
