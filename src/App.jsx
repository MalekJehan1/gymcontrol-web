import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import WithAuth from "./auth/WithAuth";
import Home from "./pages/Home";


const router = createBrowserRouter([

  { path: "/", element: <Home/> },
    { path: "/login", element: <Login /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
