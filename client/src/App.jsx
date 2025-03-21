import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Success from './components/Success'
import Error from './components/Error'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/error?' element= {<Error/>}/>
          <Route path='/success' element= {<Success/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
