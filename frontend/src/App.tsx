import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.scss'
import {Login} from "./Login.tsx";
import {StoreProvider} from "./StoreContext.tsx";
import {Balance} from "./Balance.tsx";

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