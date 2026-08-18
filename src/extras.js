''

import { useContext, useRef, useState } from "react"
import { Details } from "./App"

export const Add = function ({ Name }) {
  const context = useContext(Details)
  const track = useRef(0)
  const [edit, setEdit] = useState('')
  const func = () => {
    context.setCur(Name)
  }
  const insert = (e) => {
    e.preventDefault()
    setEdit(track.current.value)
    if (!edit) return
    const arr = context.friends.map((el) => {
      if (el.Name === context.cur) {
        el.share = Number(el.share) + Number(edit)
        return el
      } else {
        return el
      }
    })
    context.setfriends(arr)

  }
  return <div className="add-component">
    <button className="btn-edit" onClick={func}>Edit</button>
    {Name === context.cur && (
      <div className="modal-overlay" onClick={() => context.setCur('')}>
        <form className="add-form modal-popup" onClick={(e) => e.stopPropagation()}>
          <p className="modal-title">Add Amount for <strong>{Name}</strong></p>
          <input className="add-input" type="number" placeholder="Amount" ref={track} autoFocus />
          <div className="modal-actions">
            <button className="btn-submit" onClick={insert}>Add</button>
            <button type="button" className="btn-close" onClick={() => context.setCur('')}>Cancel</button>
          </div>
        </form>
      </div>
    )}
  </div>
}
export const Delete = function ({ Name }) {
  const context = useContext(Details)
  const click = () => {
    console.log(Name)
    const filtered = context.friends.filter((e) => e.Name !== Name)
    console.log(filtered)
    context.setfriends(filtered)
  }
  return <div className="delete-component">
    <button className="btn-remove" onClick={click}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
      </svg>
      Remove
    </button>
  </div>
}