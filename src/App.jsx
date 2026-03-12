import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import HomePage       from './pages/HomePage';
import StartProjectPage from './pages/StartProjectPage';
import ProjectsPage   from './pages/ProjectsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<HomePage />} />
        <Route path="/start-project"  element={<StartProjectPage />} />
        <Route path="/projects"       element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}