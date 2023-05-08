import React, {useContext} from "react";
import {StoreContext, actions} from "../StoreContext.tsx";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";

export const Login: React.FC = () => {
    const {state, dispatch} = useContext(StoreContext)

    const fetchRoot = async () => {
        const toastId = toast.loading("Init Application")
        try {
            const response = await fetch('/api/init')

            if (!response.ok) {
                const msg = "Got bad response from the server. Check error log to troubleshoot.";
                toast.update(toastId, {render: msg, type: toast.TYPE.ERROR, isLoading: false, closeOnClick: true})
                console.error("response not ok:", response.status, response.statusText)
                return
            }

            const {msg} = await response.json()
            toast.update(toastId, {render: msg, isLoading: false, type: toast.TYPE.SUCCESS, autoClose: 5000})
            dispatch({type: actions.LOGGED})
        } catch (err) {
            const msg = "Cannot get balances from server. Is server down?";
            toast.update(toastId, {render: msg, type: toast.TYPE.ERROR, isLoading: false, closeOnClick: true})
            console.error(err)
        }
    }

    if (state.isLoggedIn) {
        return (
            <Navigate to={'/'}/>
        )
    }

    return (
        <>
            <h1>
                login
            </h1>
            <button onClick={fetchRoot}>
                init
            </button>
        </>
    )
}
