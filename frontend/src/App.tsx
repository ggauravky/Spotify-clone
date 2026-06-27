import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import authCallback from './pages/auth-callback/authCallback';

function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<authCallback />} />
      </Routes>
    </>
  );
}

export default App;