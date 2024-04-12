import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Main from './components/Main.jsx'
import Bathroom from './components/Bathroom.jsx'
const App = () =>{
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/bathroom' element={<Bathroom/>}></Route>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/bathroom' element={<Bathroom/>}></Route>
      </Routes>
    </BrowserRouter>
)
}
export default App;