import React, {useContext, useMemo, useState} from "react";
import {actions, StoreContext} from "../StoreContext.tsx";
import {Navigate} from "react-router-dom";
import {Table} from "../components/Table.tsx";

type RequestLoanDto = {
    balanceSheet: any[],
    loanAmount: number
}

export const Balance: React.FC = () => {
    const {state, dispatch} = useContext(StoreContext)
    const [amount, setAmount] = useState('')
    const columns = useMemo(() => [
        {Header: 'Year', accessor: 'year'},
        {Header: 'Month', accessor: 'month'},
        {Header: 'Asset Value', accessor: 'assetsValue'},
        {Header: 'Profit Or Loss', accessor: 'profitOrLoss'},
    ], [])

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

    const requestLoan = async () => {
        const isValid = /\d+/.test(amount)
        if (!isValid) {
            // todo: make error comes in a nicer way
            window.alert(`Only numbers allowed. Your input: ${amount}`)
            return
        }

        const payload: RequestLoanDto = {
            loanAmount: Number(amount),
            balanceSheet: state.balances,
        }

        try {
            // todo: add spinner
            const response = await fetch('/api/loan_request', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                console.error('response not ok:', response.status, response.statusText)
                return
            }

            const {answer, assessment} = await response.json()
            window.alert(`The decision is: answer: ${answer}, assessment score: ${assessment}`)
        } catch (err) {
            console.error(err)
        }
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
                <input type={"text"} placeholder={"Amount"} value={amount} onChange={e => setAmount(e.target.value)}/>
                <button onClick={requestLoan}>
                    Submit
                </button>
            </div>
            <div>
                <Table columns={columns} data={state.balances} />
            </div>
        </>
    )
}