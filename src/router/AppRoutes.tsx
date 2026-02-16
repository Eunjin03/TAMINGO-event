import { createBrowserRouter } from "react-router-dom";
import StartPage from "../pages/start";
import ShootingPage from "../pages/shooting";
import DecoPage from "../pages/deco";
import ResultPage from "../pages/result";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/shooting",
    element: <ShootingPage />,
  },
  {
    path: "/deco",
    element: <DecoPage />,
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
]);
