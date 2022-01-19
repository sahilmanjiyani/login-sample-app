import React, { useState } from 'react';
import Login from './Login/Login';
import './App.css';

function App() {

  const [token, setToken] = useState();

  if(!token) {
    return (
              <div className="App">
                  <Login setToken={setToken} />
              </div>
    ) 
  }

  return (
    <div className="App">
      <h1>Logged In</h1>
    </div>
  );
}

export default App;
