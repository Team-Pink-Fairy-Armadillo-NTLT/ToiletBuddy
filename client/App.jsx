import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Main from '../Components/Main.jsx'
import Profile from '../Components/Profile.jsx'
const App = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
)
}
export default App;