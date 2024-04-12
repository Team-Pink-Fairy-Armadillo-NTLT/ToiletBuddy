import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Main from './components/Main.jsx'
import Profile from './components/Profile.jsx'
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