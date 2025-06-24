import { useState } from 'react'
import '../App.css'
import Navbar from '../components/Navbar/NavBar'

function App() {
  const [count, setCount] = useState(0)


  return (
    <div className="header">
      <Navbar activeNavTab={(val)=>setCount(val)}/>
        {/* <div className="dashnoard-main"/> */}
      <div className="blured-curcle-bg"/>
    </div>
  )
}

export default App
