
import './App.css';
import { Bill, Clear, Expenses, Pdf, Profile, Storage } from './storage';
import { createContext, useEffect, useState } from 'react';
export const Details = createContext()
function App() {
  const [expenses, setExpense] = useState(() => {
    const ex = JSON.parse(localStorage.getItem('expense')) || []
    return ex
  })
  const [friends, setfriends] = useState(() => {
    const store = JSON.parse(localStorage.getItem('friends')) || []
    return store
  })
const[cur,setCur]=useState('')
  const [Name, setName] = useState('')
  const [share, setShare] = useState('')
  const [c, setC] = useState(false)
  useEffect(() => {
    if (!Name || !share) return
    setfriends(fr => [...fr, { Name, share }])

//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c])
  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends))

    return () => {
      setName('')
      setShare('')
    }
  }, [friends])
  //  localStorage.removeItem('friends')

  return (
    <div className="App">
      <Details value={{ friends, setfriends, Name, setName, share, setShare, c, setC, expenses, setExpense,cur,setCur}}>

        <Storage></Storage>
        <Profile></Profile>
        <Expenses></Expenses>
        <Bill></Bill>
        <Clear></Clear>
        <Pdf></Pdf>
      </Details>
    </div>
  );
}

export default App;
