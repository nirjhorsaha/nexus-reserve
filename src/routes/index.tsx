import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import MeetingRoom from "@/pages/MeetingRoom";
import ErrorPage from "@/pages/Shared/ErrorPage";
import Login from "@/pages/Shared/Login";
import Signup from "@/pages/Shared/SignUp";
import SuccessPage from "@/pages/SuccessPage";
import { routeGenerator } from "@/utils/routeGenerator";
import { userPaths } from "./userRoute";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { adminPaths } from "./adminRoute";
import UserDashboard from "@/pages/user/UserDashboard";
import AdminDashboard from "@/pages/admin/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: routeGenerator(adminPaths),
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        ),
        children: routeGenerator(userPaths),
      },
      {
        path: "/meeting-room",
        element: <MeetingRoom />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      }
    ],
  }
]);

export default router;
