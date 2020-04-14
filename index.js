import { ElementHandler, LinkHandler } from './elementHandler';

// listen to fetch event from worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function fetchAPI(url) {
  return await fetch(url, { method: "GET" })
}

// handle request from worker
async function handleRequest(request) {
  console.log(request.url)

  let apiResponse = await fetchAPI("https://cfw-takehome.developers.workers.dev/api/variants").then(res => res.json());
  //headers config
  let responseHeaders = { 'Content-Type': 'text/html' }
  let index

  //check if the user cookie cached
  if (request.headers.cookie) {
    content = requestHeader.cookie.split("=")
    index = int(content[1])
  }
  else {
    index = Math.floor(Math.random() * 2); // randomly generate index [0,1]
    responseHeaders['Set-Cookie'] = `index=${index}`;
  }

  // url randomly selected from array of two urls
  let randomRedirectedURL = await apiResponse.variants[index];

  // Customizing the worker page
  let pageResponse = await fetchAPI(randomRedirectedURL).then(res => res.body);
  return new HTMLRewriter().on('title', new ElementHandler("Nhan Le's Customized Title"))
    .on('h1#title', new ElementHandler("Nhan Le's Worker"))
    .on('a#url', new ElementHandler("My Portfolio"))
    .on('a#url', new LinkHandler("http://nhantle.com/"))
    .transform(new Response(pageResponse, { headers: responseHeaders }))
}