import { useState } from 'react';
import './App.css';
import ChemViewer from './chemDiagram';
import MathEquations from './MathEquations';

function App() {
  const [selectedView, setSelectedView] = useState(null);

  return (
    <div className="app-container">
      {!selectedView && (
        <div className="card">
          <h2 className="title">Choose Viewer</h2>
          <div className="button-group">
            <button onClick={() => setSelectedView('math')}>Math Equations</button>
            <button onClick={() => setSelectedView('chem')}>Chemical Structures</button>
          </div>
        </div>
      )}

      {selectedView && (
        <div className="viewer-container">
          {selectedView === 'math' && <MathEquations />}
          {selectedView === 'chem' && <ChemViewer />}

          {/* Bottom Back Button */}
          <div className="back-container">
            <button className="back-button" onClick={() => setSelectedView(null)}>
              ← Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
