import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* Pages */
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import HomePage from './pages/HomePage';


export default function App() {

  return (
    
    <BrowserRouter>

      <Routes>


        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />}/>
        <Route path='/reset-password' element={<ResetPasswordPage />}/>

        {/* Protected Routes */}
        <Route path='/home' element={<HomePage />} />

        <Route path='*' element={<>Not Found</>} />
        
      </Routes>

    </BrowserRouter>

  );

}