import Header from './modules/Header';
import Show from './modules/show';
import Update from './modules/Post';
import Calculation from './modules/Calculation';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'; 




function App() {
  
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' Component={Show} />
          <Route exact path='/scores' Component={Update} />
          <Route exact path='/calculation' Component={Calculation} />
        </Routes>
    </BrowserRouter>
  );
}


export default App;
