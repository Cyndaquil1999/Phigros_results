import Results from './modules/Show_Score';
import Update from './modules/Post';
import Calculation from './modules/Calculation';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'; 




function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' Component={Results} />
          <Route exact path='/scores' Component={Update} />
          <Route exact path='/calculation' Component={Calculation} />
        </Routes>
    </BrowserRouter>
  );
}


export default App;
