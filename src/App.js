import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  const ip = async() => {
    const response = await fetch('http://localhost:3000/');
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            
            const data = await response.text();
            const sanitizedContent = data.replace(/&(?!#?\w+;)/g, '&amp;');
            const dom = new DOMParser().parseFromString(sanitizedContent, "text/xml");
            console.log(dom)
            const bodyElement = document.getElementsByTagName('body')[0];

            const headElement = document.getElementsByTagName('head')[0];

            const head = dom.querySelectorAll('head')[0].children;
            for (let i = 0; i< head.length ; i ++) {
              headElement.append(head[i]);
            }
            const body = dom.querySelectorAll('body')[0].children;
            for (let i = 0; i< body.length ; i ++) {
              bodyElement.append(body[i]);
            }
           
           
            console.log(dom.all[0])
            // document.append(dom.all[0])
            console.log(data)
  }

  useEffect(() => {
    ip();
  },[])

  return (
    <div className="App">
     
    </div>
  );
}

export default App;
