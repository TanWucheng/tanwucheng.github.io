document.addEventListener("DOMContentLoaded",()=>{let t=!1,r,n=!0,e=CONFIG.path;0===e.length?e="search.xml":e.endsWith("json")&&(n=!1);const o=document.querySelector(".search-input"),l=document.getElementById("search-result");var v=(t,e,r)=>{if(CONFIG.localsearch.unescape){let e=document.createElement("div");e.innerText=t,t=e.innerHTML}var n=t.length;if(0===n)return[];let o=0;var l;let s=[];for(r||(e=e.toLowerCase(),t=t.toLowerCase());-1<(l=e.indexOf(t,o));)s.push({position:l,word:t}),o=l+n;return s},f=(e,t,r,n)=>{var o=r[r.length-1];let{position:l,word:s}=o,a=[],i=0;for(;l+s.length<=t&&0!==r.length;){s===n&&i++,a.push({position:l,length:s.length});var c=l+s.length;for(r.pop();0!==r.length&&(o=r[r.length-1],l=o.position,s=o.word,c>l);)r.pop()}return{hits:a,start:e,end:t,searchTextCount:i}},C=(r,e)=>{let n="",o=e.start;return e.hits.forEach(e=>{n+=r.substring(o,e.position);var t=e.position+e.length;n+=`<b class="search-keyword">${r.substring(e.position,t)}</b>`,o=t}),n+=r.substring(o,e.end),n},s=()=>{if(t){let p=o.value.trim().toLowerCase(),e=p.split(/[-\s]+/);1<e.length&&e.push(p);let g=[];0<p.length&&r.forEach(({title:n,content:o,url:l})=>{var t=n.toLowerCase(),r=o.toLowerCase();let s=[],a=[],i=0;if(e.forEach(e=>{s=s.concat(v(e,t,!1)),a=a.concat(v(e,r,!1))}),0<s.length||0<a.length){var c=s.length+a.length;[s,a].forEach(e=>{e.sort((e,t)=>t.position!==e.position?t.position-e.position:e.word.length-t.word.length)});let e=[];0!==s.length&&(d=f(0,n.length,s,p),i+=d.searchTextCountInSlice,e.push(d));let r=[];for(;0!==a.length;){var{position:h,word:u}=a[a.length-1];let e=h-20,t=h+80;e<0&&(e=0),t<h+u.length&&(t=h+u.length),t>o.length&&(t=o.length);u=f(e,t,a,p);i+=u.searchTextCountInSlice,r.push(u)}r.sort((e,t)=>e.searchTextCount!==t.searchTextCount?t.searchTextCount-e.searchTextCount:e.hits.length!==t.hits.length?t.hits.length-e.hits.length:e.start-t.start);var d=parseInt(CONFIG.localsearch.top_n_per_article,10);0<=d&&(r=r.slice(0,d));let t="";0!==e.length?t+=`<li><a href="${l}" class="search-result-title">${C(n,e[0])}</a>`:t+=`<li><a href="${l}" class="search-result-title">${n}</a>`,r.forEach(e=>{t+=`<a href="${l}"><p class="search-result">${C(o,e)}...</p></a>`}),t+="</li>",g.push({item:t,id:g.length,hitCount:c,searchTextCount:i})}}),1===e.length&&""===e[0]?l.innerHTML='<div id="no-result"><i class="fa fa-search fa-5x"></i></div>':0===g.length?l.innerHTML='<div id="no-result"><i class="far fa-frown fa-5x"></i></div>':(g.sort((e,t)=>e.searchTextCount!==t.searchTextCount?t.searchTextCount-e.searchTextCount:e.hitCount!==t.hitCount?t.hitCount-e.hitCount:t.id-e.id),l.innerHTML=`<ul class="search-result-list">${g.map(e=>e.item).join("")}</ul>`,window.pjax&&window.pjax.refresh(l))}},a=()=>{fetch(CONFIG.root+e).then(e=>e.text()).then(e=>{t=!0,r=n?[...(new DOMParser).parseFromString(e,"text/xml").querySelectorAll("entry")].map(e=>({title:e.querySelector("title").textContent,content:e.querySelector("content").textContent,url:e.querySelector("url").textContent})):JSON.parse(e),r=r.filter(e=>e.title).map(e=>(e.title=e.title.trim(),e.content=e.content?e.content.trim().replace(/<[^>]+>/g,""):"",e.url=decodeURIComponent(e.url).replace(/\/{2,}/g,"/"),e)),document.getElementById("no-result").innerHTML='<i class="fa fa-search fa-5x"></i>',s()})};CONFIG.localsearch.preload&&a(),"auto"===CONFIG.localsearch.trigger?o.addEventListener("input",s):(document.querySelector(".search-icon").addEventListener("click",s),o.addEventListener("keypress",e=>{"Enter"===e.key&&s()})),document.querySelectorAll(".popup-trigger").forEach(e=>{e.addEventListener("click",()=>{document.body.style.overflow="hidden",document.querySelector(".search-pop-overlay").classList.add("search-active"),o.focus(),t||a()})});var i=()=>{document.body.style.overflow="",document.querySelector(".search-pop-overlay").classList.remove("search-active")};document.querySelector(".search-pop-overlay").addEventListener("click",e=>{e.target===document.querySelector(".search-pop-overlay")&&i()}),document.querySelector(".popup-btn-close").addEventListener("click",i),window.addEventListener("pjax:success",i),window.addEventListener("keyup",e=>{"Escape"===e.key&&i()})});