import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import BigScoreOnePages from "./pages/BigScoreOnePages";
import BigScoreMultiPages from "./pages/BigScoreMultiPages";
// import BigScoreBoard from "./components/BigScoreBoard"

const router = createBrowserRouter([
    {
      path: "/",
      element: <BigScoreOnePages/>,
    },
    {
      path: "/multi",
      element: <BigScoreMultiPages/>,
    },
]);

function App() {
    return (
        <>
        <RouterProvider router={router} />
        </>
    )
}

export default App
