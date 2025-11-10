import { memo, useState } from 'react';
import './App.css';
import { Cat } from './components/test';

const PureCat = memo(Cat, (p, c) => p.name === c.name)
function App() {
  const [cats, setCats] = useState(["ripple", "bala", "ton"])
  return (
    <div className="App">
      {
        cats.map((c, i) => <PureCat key={i} name={c} fn={() => console.log(c)} ></PureCat>)
      }
      <button onClick={() => { setCats([...cats, prompt("add cat name")]) }}>Add Cat</button>
    </div>
  );
}

export default App;
