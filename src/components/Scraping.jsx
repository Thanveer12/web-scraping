import React, { useEffect, useState } from 'react';

function Scraping() {

    const [updateUrl, setUpdateUrl] = useState('')

    const scrapWebsite = async() => {
        const response = await fetch(`http://localhost:4000/fetch-url/${encodeURIComponent(updateUrl)}`);
                
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                const sanitizedContent = data.web.replace(/&(?!#?\w+;)/g, '&amp;');
                if ('ad' in data) {
                    const ad = JSON.parse(data['ad']);
                    console.log(ad, 'add')
                }
                const api = data.apiCalls;
                const dom = new DOMParser().parseFromString(sanitizedContent, "text/html");
                console.log(dom)

                const button = dom.getElementsByTagName('button')
                const anchor = dom.getElementsByTagName('a');
                const script = dom.getElementsByTagName('script')
                const meta = dom.getElementsByTagName('meta');
                const link = dom.getElementsByTagName('link');
                const input = dom.getElementsByTagName('input');


                const scraperContainer = document.getElementById('scraper-container')
                const apiDiv = document.createElement('div')
                const apiHeading = document.createElement('h1');
                
                apiDiv.append(apiHeading);
                const apiUl = document.createElement('ul');
                for (let i = 0; i < api.length; i++){
                    apiHeading.innerHTML = 'Network Call';
                    // scraperContainer.append(button[i]);
                    const apiLi = document.createElement('li');
                    apiLi.innerHTML = api[i];
                    apiUl.append(apiLi);
                }
                apiDiv.append(apiUl);
                scraperContainer.append(apiDiv);




                const linkDiv = document.createElement('div')
                const linkHeading = document.createElement('h1');
                // linkHeading.innerHTML = 'Link';
                linkDiv.append(linkHeading);
                const linkUl = document.createElement('ul');
                for (let i = 0; i < link.length; i++){
                    linkHeading.innerHTML = 'Link';
                    // scraperContainer.append(button[i]);
                    const linkLi = document.createElement('li');
                    linkLi.innerHTML = '<b>href-</b>' + link[i].href + '  <b>id-</b>' + link[i].id;
                    linkUl.append(linkLi);
                }
                linkDiv.append(linkUl);
                scraperContainer.append(linkDiv);

                const metaDiv = document.createElement('div')
                const metaHeading = document.createElement('h1');
                // metaHeading.innerHTML = 'Meta';
                metaDiv.append(metaHeading);
                const metaUl = document.createElement('ul');
                for (let i = 0; i < meta.length; i++){
                    // scraperContainer.append(button[i]);
                    metaHeading.innerHTML = 'Meta';
                    const metaLi = document.createElement('li');
                    metaLi.innerHTML = '<b>content-</b>' + meta[i].content + '  <b>property-</b>' + meta[i].property + ' <b>name-</b>' + meta[i].name;
                    metaUl.append(metaLi);
                }
                metaDiv.append(metaUl);
                scraperContainer.append(metaDiv);


                const buttonDiv = document.createElement('div')
                const buttonHeading = document.createElement('h1');
                // buttonHeading.innerHTML = 'Button';
                buttonDiv.append(buttonHeading);
                const buttonUl = document.createElement('ul');
                for (let i = 0; i < button.length; i++){
                    buttonHeading.innerHTML = 'Button';
                    const buttonLi = document.createElement('li');
                    buttonLi.innerHTML = button[i].innerText;
                    // scraperContainer.append(button[i]);
                    buttonUl.append(buttonLi)
                }
                buttonDiv.append(buttonUl)
                scraperContainer.append(buttonDiv);

                const anchorDiv = document.createElement('div')
                const anchorHeading = document.createElement('h1');
                // anchorHeading.innerHTML = 'Anchor';
                anchorDiv.append(anchorHeading);
                const anchorUl = document.createElement('ul');
                for (let i = 0; i < anchor.length; i++){
                    anchorHeading.innerHTML = 'Anchor';
                    // scraperContainer.append(anchor[i]);
                    const anchorLi = document.createElement('li');
                    anchorLi.innerHTML = '<b>href-</b>' + anchor[i].href + ' <b>content-</b>'+ anchor[i].innerText;
                    anchorUl.append(anchorLi);
                }
                anchorDiv.append(anchorUl);
                scraperContainer.append(anchorDiv);



                const scriptDiv = document.createElement('div')
                const scriptHeading = document.createElement('h1');
                // scriptHeading.innerHTML = 'Script';
                scriptDiv.append(scriptHeading);
                const scriptUl = document.createElement('ul');
                for (let i = 0; i < script.length; i++){
                    // scraperContainer.append(script[i]);
                    scriptHeading.innerHTML = 'Script';
                    const li = document.createElement('li');
                    li.innerHTML = '<b>src-</b>' + script[i].src + ' <b>id-</b>' + script[i].id ;
                    // scriptDiv.innerHTML += '<br>'+script[i].id + '---' + script[i].src;
                    scriptUl.append(li);
                }
                scriptDiv.append(scriptUl);
                scraperContainer.append(scriptDiv)


                const inputDiv = document.createElement('div')
                const inputHeading = document.createElement('h1');
                // inputHeading.innerHTML = 'Input';
                inputDiv.append(inputHeading);
                const inputUl = document.createElement('ul');
                for (let i = 0; i < input.length; i++){
                    inputHeading.innerHTML = 'Input';
                    const inputLi = document.createElement('li');
                    inputLi.innerHTML = '<b>name-</b>' + input[i].name + ' <b>placeHolder-</b>' + input[i].placeholder;
                    inputUl.append(inputLi);
                }
                inputDiv.append(inputUl);
                scraperContainer.append(inputDiv);
            
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
     <div id={'scraper-container'}></div>
    </div>
  );
}

export default Scraping;
