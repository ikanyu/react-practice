import { useState } from 'react';
import './App.css';

function App() {
  const [show, setShow] = useState(true);

  function toggleDisplay() {
    setShow(!show);
  }

  return (
    <div className="App">
      <button type="button" onClick={toggleDisplay}>
        Show/Hide
      </button>
      {show ? <h1>Hello World!</h1> : <h1>Disappeared</h1>}
    </div>
  );
}

export default App;
