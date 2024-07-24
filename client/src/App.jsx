import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* Pages */
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


export default function App() {

  return (
    
    <BrowserRouter>

      <Routes>


        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route path='*' element={<>Not Found</>} />
        
      </Routes>

    </BrowserRouter>

  );

}