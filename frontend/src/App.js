import './App.css';
import axios from 'axios'
import * as React from 'react';
import {useState, useEffect} from 'react';
import DataEntry from './Components/DataEntry';
import DataDisplay from './Components/DataDisplay.js';

function App() {
  const [info, setInfo] = useState();

  useEffect(() => {
    fetch('http://localhost:9000/demo/info')
    .then((res) => res.json())
    .then((text) => setInfo(text.result))
    .catch((err) => console.log(err))
  }, [])

  return (
    <div className="App">
      <DataEntry />
      {info && <DataDisplay messages={info}/> }
    </div>
  );
}

export default App;
