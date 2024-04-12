import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Main from '../Components/Main.jsx'
import Homepage from '../Components/Homepage.jsx'
const App = () =>{
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/homepage' element={<Homepage/>}></Route>
        <Route path='/' element={<Main/>}></Route>
      </Routes>
    </BrowserRouter>
)
}
export default App;