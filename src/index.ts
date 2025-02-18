import dns from 'node:dns';

let responese = await dns.promises.resolve4('cloudflare.com', 'NS');
