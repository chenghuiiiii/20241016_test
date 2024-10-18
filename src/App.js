import React, { useEffect, useState } from 'react';
import './App.css';
import { addComma, getNumberIntervals } from './FunctionList';
import PriceInput from './Components/PriceInput';
import AgeGroupSelect from './Components/AgeGroupSelect';

function App() {
  const [array, setArray] = useState([[], [], [], []]);
  const addArray = (val, index, position) => {
    console.log(val, index, position);
    const rs = [...array];
    if (position === 'start') rs.splice(index, 1, [val, array[index][1] || 20]);
    if (position === 'end') rs.splice(index, 1, [array[index][0] || 0, val]);
    setArray(rs);
  }

  useEffect(() => {
    console.log(array, typeof array, 'inside useEffect');
    const res = getNumberIntervals(array);
    console.log('after running: ', res);
  }, [array]);

  return (
    <div className="App">
      <section className="App-section">
        <p>AsiaYo PreTest Display page</p>
        {/* <input onChange={addComma}></input> */}
        <input onChange={(e) => addComma(e.target.value)}></input>
        <PriceInput />
        <hr />
        <div style={{ display: 'flex' }}>
          <input onChange={(e) => addArray(e.target.value, 0, 'start')} />
          <input onChange={(e) => addArray(e.target.value, 0, 'end')} />
        </div>
        <div style={{ display: 'flex' }}>
          <input onChange={(e) => addArray(e.target.value, 1, 'start')} />
          <input onChange={(e) => addArray(e.target.value, 1, 'end')} />
        </div>
        <div style={{ display: 'flex' }}>
          <input onChange={(e) => addArray(e.target.value, 2, 'start')} />
          <input onChange={(e) => addArray(e.target.value, 2, 'end')} />
        </div>
        <div style={{ display: 'flex' }}>
          <input onChange={(e) => addArray(e.target.value, 3, 'start')} />
          <input onChange={(e) => addArray(e.target.value, 3, 'end')} />
        </div>
        <AgeGroupSelect overlap />
      </section>
    </div>
  );
}

export default App;
