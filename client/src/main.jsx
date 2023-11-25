import  ReactDOM  from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import SignupForm from "./pages/SignupForm.jsx"
import LoginForm from "./pages/LoginForm.jsx"
import SearchClothes from "./pages/SearchClothes.jsx";
// import SavedClothes from "./pages/SavedClothes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        path: "/signup",
        element: <SignupForm />
      },
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        index: true,
        element: <SearchClothes />,
      },
    //   {
    //     path: "/saved",
    //     element: <SavedClothes />,
    //   },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
