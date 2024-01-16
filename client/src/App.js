import { Route, Routes } from 'react-router-dom';
// Pages
import HomePage from './pages/home/HomePage';
import LoginPage from './users/login/LoginPage';
import RegisterPage from './users/register/RegisterPage';
import Error404 from './pages/error/Error404';
import TestPost from './pages/home/TestPost';
import PostRequest from './pages/home/PostRequest';
import Post2 from './pages/home/Post2';

function App() {
  return (
    <Routes>
      <Route path='/' index element={<TestPost />} />
      <Route path='/post' index element={<PostRequest />} />
      <Route path='/post2' index element={<Post2 />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<RegisterPage />} />
      <Route path='*' element={<Error404 />} />
    </Routes>
  );
}

export default App;
