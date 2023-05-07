import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import {StoreProvider} from "./StoreContext.tsx";
import {Balance} from "./pages/Balance.tsx";

const router = createBrowserRouter([
    {
        errorElement: <div>Oops... Something went wrong!</div>
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/',
        Component: Balance,
    }
])

export function App() {
    return (
        <StoreProvider>
            <RouterProvider router={router}/>
        </StoreProvider>
    )
}