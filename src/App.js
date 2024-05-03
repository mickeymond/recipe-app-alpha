import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Recipe from "./pages/recipe";
import Recipes from "./pages/recipes";
import AddRecipe from "./pages/add-recipe";
import AuthGuard from "./guards/AuthGuard";
import Login from "./pages/login";
import NoAuthGuard from "./guards/NoAuthGuard";
import Register from "./pages/register";

const router = createBrowserRouter([
  { path: "/", element: <AuthGuard component={<Recipes />} /> },
  { path: "/recipes", element: <AuthGuard component={<Recipes />} /> },
  { path: "/recipes/:id", element: <AuthGuard component={<Recipe />} /> },
  { path: '/add-recipe', element: <AuthGuard component={<AddRecipe />} /> },
  { path: '/login', element: <NoAuthGuard component={<Login />} /> },
  { path: '/register', element: <NoAuthGuard component={<Register />} /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
