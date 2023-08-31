import React, { useEffect, useState } from 'react';

function Scraping() {

    const [updateUrl, setUpdateUrl] = useState('')

    const scrapWebsite = async() => {
        const response = await fetch(`http://localhost:4000/fetch-url/${encodeURIComponent(updateUrl)}`);
                
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                
                const data = await response.text();
                const sanitizedContent = data.replace(/&(?!#?\w+;)/g, '&amp;');
                const dom = new DOMParser().parseFromString(sanitizedContent, "text/html");
                console.log(dom)
                // const bodyElement = document.getElementsByTagName('body')[0];
    
                // const headElement = document.getElementsByTagName('head')[0];
    
                // const head = dom.querySelectorAll('head')[0].children;
                // for (let i = 0; i< head.length ; i ++) {
                //   headElement.append(head[i]);
                // }
                // const body = dom.querySelectorAll('body')[0].children;
                // for (let i = 0; i< body.length ; i ++) {
                //   bodyElement.append(body[i]);
                // }
               
               
                // console.log(dom.all[0])
                // // document.append(dom.all[0])
                // console.log(data)
    }

    const validURL = (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }
      

  return (
    <div className="scrap-container">
        <div className='scrap-sub-container'>
            <input type={'url'} onChange={(e) => {setUpdateUrl(e.target.value)}}></input>
            <button onClick={(e) => {
                scrapWebsite(e)
            }} disabled={!validURL(updateUrl)}>Scrap website</button>
        </div>
     {/* <div id={''}></div> */}
    </div>
  );
}

export default Scraping;
