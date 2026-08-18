''

import { useContext, useEffect, useRef, useState } from "react"
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
    track.current.value = ''
  }


  useEffect(() => {
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
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit])
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