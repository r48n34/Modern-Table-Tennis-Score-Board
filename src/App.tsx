import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComp from "./components/common/ErrorComp";
import LoadingPage from "./components/common/LoadingPage";

const BigScoreOnePages = lazy(() => import('./pages/BigScoreOnePages'));
const BigScoreMultiPages = lazy(() => import('./pages/BigScoreMultiPages'));
const RoadMap = lazy(() => import('./pages/RoadMap'));


const router = createBrowserRouter([
    {
        path: "/",
        element: <BigScoreOnePages />,
    },
    {
        path: "/multi",
        element: <BigScoreMultiPages />,
    },
    {
        path: "/roadmap",
        element: <RoadMap lang="en"/>,
    },
    {
        path: "/roadmap/en",
        element: <RoadMap lang="en"/>,
    },
    {
        path: "/roadmap/ch",
        element: <RoadMap lang="ch"/>,
    },
]);

function App() {
    return (
        <>
            <ErrorBoundary fallback={<ErrorComp />}>
                <Suspense fallback={<LoadingPage />}>
                    <RouterProvider router={router} />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}

export default App
