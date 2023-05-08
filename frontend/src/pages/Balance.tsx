import React, {useContext, useMemo, useState} from "react";
import {actions, StoreContext} from "../StoreContext.tsx";
import {Navigate} from "react-router-dom";
import {Table} from "../components/Table.tsx";
import {toast} from "react-toastify";

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

    const fetchBalance = async () => {
        const toastId = toast.loading("Getting balances...")
        try {
            const response = await fetch("/api/balance")

            if (!response.ok) {
                toast.update(toastId, {
                    render: 'Got bad response from the server. Check error log to troubleshoot.',
                    type: 'error',
                    isLoading: false,
                    closeOnClick: true,
                })
                console.error('response not ok', response.status, response.statusText);
                return
            }
            const {data} = await response.json();
            dispatch({type: actions.SET_BALANCES, payload: data})
            toast.update(toastId, {type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000})
        } catch (err) {
            toast.update(toastId, {
                render: 'Cannot get balances from server. Is server down?',
                type: 'error',
                isLoading: false,
                closeOnClick: true,
            })
            console.error(err)
        }
    }

    const requestLoan = async () => {
        const isValid = /\d+/.test(amount)
        if (!isValid) {
            toast(`Only numbers allowed. Your input: ${amount}`, {type: 'warning'})
            return
        }

        const payload: RequestLoanDto = {
            loanAmount: Number(amount),
            balanceSheet: state.balances,
        }

        const toastId = toast.loading("Submitting loan request")
        try {
            const response = await fetch('/api/loan_request', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                toast.update(toastId, {
                    render: 'Got bad response from the server. Check error log to troubleshoot.',
                    type: 'error',
                    isLoading: false,
                    closeOnClick: true,
                })
                console.error('response not ok:', response.status, response.statusText)
                return
            }

            const {answer, assessment} = await response.json()
            const msg = `The decision is: answer: ${answer}, assessment score: ${assessment}`;
            toast.update(toastId, {render: msg, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000})
        } catch (err) {
            toast.update(toastId, {
                render: 'Cannot get balances from server. Is server down?',
                type: 'error',
                isLoading: false,
                closeOnClick: true,
            })
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
                <Table columns={columns} data={state.balances}/>
            </div>
        </>
    )
}