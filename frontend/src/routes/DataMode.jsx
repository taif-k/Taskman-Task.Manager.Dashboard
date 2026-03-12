import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

import ProfilePage from "../pages/ProfilePage";
// import TaskPage from "../pages/TaskPage";
import TaskBoard from "../components/TaskBoard";
import AuthLayout from "../layout/AuthLayout";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([

  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TaskBoard />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> }
    ]
  }
]);
