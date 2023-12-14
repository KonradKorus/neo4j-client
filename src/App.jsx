import { useState } from 'react';
import './App.css';
import Projects from './components/Projects';
import Employees from './components/Employees';

function App() {
  const [showProjects, setShowProjects] = useState(true);
  return (
    <div className="App">
      <p className="h2">Project Planner</p>
      <button
        type="button"
        className="btn btn-primary mt-4 "
        onClick={() => setShowProjects(true)}
      >
        Projects
      </button>
      <button
        type="button"
        className="btn btn-primary mt-4 ml-4"
        onClick={() => setShowProjects(false)}
      >
        Employees
      </button>

      <div className="mt-4" />
      {showProjects ? <Projects /> : <Employees />}
    </div>
  );
}

export default App;
