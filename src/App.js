import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Scraping from './components/Scraping';

function App() {
const imp = () => {
  console.log(this)
}

  useEffect(() => {
    imp()
  }, [])

  return (
    <div className="App">
        <Scraping />
    </div>
  );
}

export default App;
