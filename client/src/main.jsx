import  ReactDOM  from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import SignupForm from "./pages/SignupForm.jsx"
// import SearchClothes from "./pages/SearchClothes";
// import SavedClothes from "./pages/SavedClothes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        path: "/signup",
        element: <SignupForm />
      }
    //   {
    //     index: true,
    //     element: <SearchClothes />,
    //   },
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
