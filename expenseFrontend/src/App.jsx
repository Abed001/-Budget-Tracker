import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// 1. Define your routes
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    // 2. Wrap protected routes in the Guard
    // Change 'false' to 'true' to simulate being logged in
    element: <ProtectedRoute isAuthenticated={true} />, 
    children: [
      {
        path: "/app",
        element: <Dashboard />,
      },
    ],
  },
]);

// 3. Provide the router to your app
export default function App() {
  return <RouterProvider router={router} />;
}