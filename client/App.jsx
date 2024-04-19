import React from 'react';
import {HashRouter,Routes,Route} from 'react-router-dom';
import Main from './components/Main.jsx';
import Bathroom from './components/Bathroom.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () =>{

  console.log('googleMapsApiKey:',  process.env.GOOGLE_MAPS_API_KEY)
  
  return (
    <HashRouter>
      <Routes>
        <Route path='/bathroom/:placeId' element={<Bathroom/>}></Route>
        <Route path='/' element={<Main/>}></Route>
      </Routes>
    </HashRouter>
)
}
export default App;