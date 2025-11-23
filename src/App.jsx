import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import WithAuth from "./auth/WithAuth";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import Perfil from "./pages/Perfil";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <HomePage /> },
  { path: "/perfil", element: <Perfil /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
