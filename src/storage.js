''

import { useContext, useEffect, useState } from "react"
import { Details } from "./App"
import { jsPDF } from 'jspdf'
import './index.css'
import { Add } from "./extras"

export const Storage = function () {
    const context = useContext(Details)
    return <div className="storage-container">
        <div className="form-group">
            <label className="form-label">Name</label>
            <input
                type="text"
                className="form-input"
                placeholder="Enter your name"
                onChange={(e) => {
                    context.setName(e.target.value)
                }}
                value={context.Name}
            />
        </div>
        <div className="form-group">
            <label className="form-label">Share</label>
            <input
                type="number"
                className="form-input"
                placeholder="Enter your Share"
                onChange={(e) => {
                    context.setShare(e.target.value)
                }}
                value={context.share}
            />
        </div>
        <button className="btn-add" onClick={() => {
            context.setC(prev => !prev)
            // context.setfriends('')
        }}>
            Add
        </button>
    </div>
}

export const Expenses = function () {
    const context = useContext(Details)

    const [expn, setExpn] = useState(0)
    const [amount, setAmount] = useState(0)
    const [add, setAdd] = useState(false)
    const total = context.expenses.length > 0 && context.expenses.map(e => +e.amount).reduce((acc, curr) => acc + curr)
    useEffect(() => {
        if (!expn || !amount) return
        context.setExpense(list => [...list, { expn, amount }])
        //  localStorage.removeItem('expense')
        //  context.setExpense('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [add])
    useEffect(() => {
        localStorage.setItem('expense', JSON.stringify(context.expenses))
        return () => {
            setAmount('')
            setExpn('')
        }
    }, [context.expenses])
    return (
        <div className="expenses-container">
            <div className="form-group">
                <label className="form-label">Expense Name</label>
                <input
                    type="text"
                    className="expenses-input"
                    placeholder="Enter expense name"
                    onChange={(e) => { setExpn(e.target.value) }}
                    value={expn}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Amount</label>
                <input
                    type="number"
                    className="expenses-input"
                    placeholder="Enter amount"
                    onChange={(e) => { setAmount(e.target.value) }}
                    value={amount}
                />
            </div>
            <button className="expenses-button" onClick={() => { setAdd(prev => !prev) }}>Add Expense</button>
            <div className="total-container" style={{ marginTop: '16px' }}>
                <span className="total-label">Total Expense</span>
                <span className="total-value">{total || 0}</span>
            </div>
        </div>
    )
}

export const Profile = function () {
    const context = useContext(Details)
    const arr = context.friends.length > 0 && context.friends.map(e => +e.share).reduce((acc, curr) => acc + curr)

    return <div className="profile-container">
        <h2 className="profile-title">Friends</h2>
        {context.friends && context.friends.length > 0 ? (
            <div className="friends-list">
                {context.friends.map((friend, index) => (
                    <div key={index} className="friend-card">
                        <div className="friend-info">
                            <span className="friend-name">{friend.Name}</span>
                            <span className="friend-age-label">Share</span>
                        </div>
                        <span className="friend-age">{friend.share}</span>
                        <Add Name={friend.Name}></Add>
                    </div>
                ))}
                <div className="total-container">
                    <span className="total-label">Total Share</span>
                    <span className="total-value">{arr}</span>
                </div>
            </div>
        ) : (
            <div className="empty-state">No friends added yet</div>
        )}
    </div>
}
export const Bill = function () {
    const context = useContext(Details)
    if (context.expenses.length === 0 || context.friends.length===0) return
    const income = context.friends.map(e => +e.share).reduce((acc, curr) => acc + curr, 0)
    const cost = context.expenses.map(e => +e.amount).reduce((acc, curr) => acc + curr, 0)
    const balance = income - cost

    return (
        <div className="bill-container">
            <h2 className="bill-title">Summary</h2>
            <div className="bill-card">
                <div className="bill-info">
                    <span className="bill-label">Total Share</span>
                    <span className="bill-value">{income}</span>
                </div>
                <div className="bill-info">
                    <span className="bill-label">Total Expenses</span>
                    <span className="bill-value">{cost}</span>
                </div>
                <div className="bill-divider"></div>
                <div className="bill-info bill-balance-row">
                    <span className="bill-balance-label">Balance</span>
                    <span className={`bill-balance-value ${balance >= 0 ? 'positive' : 'negative'}`}>
                        {balance >= 0 ? '+' : ''}{balance}
                    </span>
                </div>
            </div>
        </div>
    )
}
export const Clear = function () {
    const context = useContext(Details)
    const clear = () => {
        context.setExpense('')
        context.setfriends('')
    }
    return <div className="clear-container">
        <button className="btn-clear" onClick={clear}>Clear</button>
    </div>
}

export const Pdf = function () {

    const [d, setD] = useState(0)
    const context = useContext(Details)
        
    const totalExpense=context.expenses.length>0 && context.expenses.map(e=>+e.amount).reduce((acc,curr)=>acc+curr)
    useEffect(() => {
        if (context.expenses.length === 0 || d===0 ) return
        const doc = new jsPDF()
        context.expenses.map((e, i) => {
            doc.text(`${i + 1}.${e.expn}:${e.amount}rs`, 10, (i + 1) * 10)

        })
        doc.text(`Total:${totalExpense}rs`,20,context.expenses.length*20)
        doc.save('myExpense.pdf')
    }, [d])

    return <div className="pdf-container">
        <button className="btn-pdf" onClick={() => { setD(pr => pr+1) }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download PDF
        </button>
    </div>
}
