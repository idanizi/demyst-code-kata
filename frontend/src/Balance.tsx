import React, {useContext, useState} from "react";
import {actions, StoreContext} from "./StoreContext.tsx";
import {Navigate} from "react-router-dom";

export const Balance: React.FC = () => {
    const {state, dispatch} = useContext(StoreContext)
    const [amount, setAmount] = useState('')
    const fetchBalance = () => {
        fetch("/api/balance")
            .then(async (response) => {
                if (!response.ok) {
                    console.error('response not ok', response.status, response.statusText);
                    return
                }
                try {
                    const {data} = await response.json();
                    dispatch({type: actions.SET_BALANCES, payload: data})
                } catch (err) {
                    console.error(err)
                }
            })
            .catch(console.error)
    }

    const requestLoan = () => {
        console.log(amount); // todo: validate input value - number only
    }

    if (!state.isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    if (state.balances.length == 0) {
        return (
            <>
                <h1>
                    Balance
                </h1>
                <button onClick={fetchBalance}>
                    balance
                </button>
            </>
        )
    }

    return (
        <>
            <h1>
                Balance
            </h1>
            <div>
                <label>
                    Request Loan:
                </label>
                <input type={"text"} placeholder={"Amount"} pattern={"\d+"} value={amount} onChange={e => setAmount(e.target.value)}/>
                <button onClick={requestLoan}>
                    Submit
                </button>
            </div>
            <div>
                <pre>
                    {JSON.stringify(state.balances, null, 2)}
                </pre>
            </div>
        </>
    )
}