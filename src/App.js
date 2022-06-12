import './App.css';
import { Header } from './components/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import {CardsDetails} from './components/CardsDetails.jsx';
import {Cards} from './components/Cards.jsx';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Cards/>}/>
        <Route path='/cart/:id' element={<CardsDetails/>}/>
      </Routes>
    </>
  );
}

export default App;
