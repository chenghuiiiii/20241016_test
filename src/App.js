import React, { useState } from 'react';
import './App.css';
import AgeGroupPriceList from './Components/AgeGroupPriceList';
import { DEFAULT_AGE_GROUP_PRICE } from './DataFormat';

function App() {
  const [list, setList] = useState([DEFAULT_AGE_GROUP_PRICE]);


  return (
    <div className="App">
      <section className="App-section">
        <p>AsiaYo PreTest Display page</p>
        <AgeGroupPriceList list={list} onChange={(result) => {console.log(result); setList(result)}} />
        {/* <input onChange={(e) => addComma(e.target.value)}></input>
        <PriceInput />
        <hr />
        <AgeGroupSelect overlap /> */}
      </section>
    </div>
  );
}

export default App;
