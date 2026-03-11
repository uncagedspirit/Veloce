import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import HomePage        from './pages/HomePage';
import StartProjectPage from './pages/StartProjectPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<HomePage />} />
        <Route path="/start-project"  element={<StartProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}