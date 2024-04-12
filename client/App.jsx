import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Main from './Components/Main.jsx'
import Bathroom from './Components/Bathroom.jsx'
const App = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/bathroom' element={<Bathroom/>}></Route>
      </Routes>
    </BrowserRouter>
)
}
export default App;