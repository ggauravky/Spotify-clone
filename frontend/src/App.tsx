import { Route, Router } from 'react-router-dom'
import HomePage from './pages/home/HomePage';
import authCallback from './pages/auth-callback/authCallback';

function App() {
  return (
    <>
    <Router>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<authCallback />} />
    </Router>
    </>
  )
}

export default App