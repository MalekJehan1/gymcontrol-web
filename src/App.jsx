import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
// import WithAuth from "./auth/WithAuth";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import Perfil from "./pages/Perfil";
import Usuarios from "./pages/Usuarios";
import ExerciciosPage from "./pages/ExerciciosPage";
import TreinosAlunoPage from "./pages/TreinosAlunoPage";
import TreinosAdminPage from "./pages/TreinosAdminPage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <HomePage /> },
  { path: "/perfil", element: <Perfil /> },
  { path: "/admin/usuarios", element: <Usuarios /> },
  { path: "/admin/exercicios", element: <ExerciciosPage /> },
  // { path: "/treinos", element: <TreinosAlunoPage /> },
  { path: "/treinos", element: <TreinosAdminPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
