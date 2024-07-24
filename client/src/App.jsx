import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* Pages */
import LoginPage from './pages/LoginPage';


export default function App() {

  return (
    
    <BrowserRouter>

      <Routes>


        <Route path='/' element={<LoginPage />} />

        <Route path='*' element={<>Not Found</>} />
        
      </Routes>

    </BrowserRouter>

  );

}