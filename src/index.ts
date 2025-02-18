import dns from 'node:dns';

// SPDX-License-Identifier: 0BSD

const doh = 'https://security.cloudflare-dns.com/dns-query'
const dohjson = 'https://security.cloudflare-dns.com/dns-query'
const contype = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
const jstontype = 'application/dns-json'
const path = ''; // default allow all, must start with '/' if specified, eg. "/dns-query"
const r404 = new Response(null, {status: 404});
const r402 = new Response(null, {status: 402});


// developers.cloudflare.com/workers/runtime-apis/fetch-event/#syntax-module-worker
export default {
    async fetch(r, env, ctx) {
        
        let b = handleRequest(r); 
        let h = (await b).headers
        let s = (await b).status
        let u = (await b).url
        let text = 'url: ' + u +'\n'
        text = text +'status: ' + s +'\n'

        //return new Response(r.status);
        //return handleRequest(r);
        for (const pair of h.entries()) {
            text = text + `${pair[0]}: ${pair[1]}` +'\n'
            
          }
        return new Response(text);
    },
};

async function handleRequest(request) {
    // when res is a Promise<Response>, it reduces billed wall-time
    // blog.cloudflare.com/workers-optimization-reduces-your-bill
    let res = r404;
    const { method2, headers, url2 } = request
    //const headers = {}
    let url = 'https://translate.google.com/'
    let method = 'GET'
    const {searchParams, pathname} = new URL(url)
    
    //Check path
    if (!pathname.startsWith(path)) {
        return r404;
    }
    if (method == 'GET' ) {
      const search = new URL(url).search
        res = fetch(url, {
            method: 'GET',
            headers: {
              'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
              'accept-language': 'en',
              'cache-control': 'no-cache',
              'dnt': '1',
              'pragma': 'no-cache',
              'priority': 'u=0, i',
              'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"Windows"',
              'sec-fetch-dest': 'document',
              'sec-fetch-mode': 'navigate',
              'sec-fetch-site': 'none',
              'sec-fetch-user': '?1',
              'upgrade-insecure-requests': '1',
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'
            }
        });
    } 
    return res;
}


