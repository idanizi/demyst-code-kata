import React, {useContext} from "react";
import {StoreContext, actions} from "../StoreContext.tsx";
import {Navigate} from "react-router-dom";

export const Login: React.FC = () => {
    const {state, dispatch} = useContext(StoreContext)

    const fetchRoot = () => {
        fetch('/api/init')
            .then(async (response) => {
            if (!response.ok) {
                console.error("response not ok:", response.status, response.statusText)
                return
            }

            try {
                const {msg} = await response.json()
                window.alert(msg)
                console.log("set is login true")
                dispatch({type: actions.LOGGED})
            } catch (err) {
                console.error(err)
            }
        })
            .catch(console.error)
    }

    if (state.isLoggedIn) {
        return (
            <Navigate to={'/'} />
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
