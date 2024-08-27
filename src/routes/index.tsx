import MainLayout from "@/components/layout/MainLayout";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/Shared/ErrorPage";
import Login from "@/pages/Shared/Login";
import Signup from "@/pages/Shared/SignUp";
import SuccessPage from "@/pages/SuccessPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{
  path: "/",
  element: <MainLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <HomePage/>,
    },
    // {
    //   path: "/products",
    //   element: <Products />
    // },
    // {
    //   path: "/product/:id",
    //   element: <ProductDetails />,
    // },
    {
      path: "/about",
      element: <AboutUs />
    },
    {
      path: "/contact",
      element: <ContactUs />
    },
    {
      path: '/success',
      element: <SuccessPage />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    }
  ],
}]);

export default router;