

function eventLoop() {
    setImmediate(() => console.log('setImmediate'));
    setTimeout(() => console.log('setTimeout'), 0);

    process.nextTick(() => {
        console.log('nextTick 1');
        process.nextTick(() => console.log('nextTick  3'));
        process.nextTick(() => console.log('nextTick  4'));
    });
    process.nextTick(() => console.log('nextTick 2'));

    Promise.resolve().then(() => {
        console.log('promise 1');
        process.nextTick(() => console.log('nextTick 5'));
    });

    console.log("sync 1")
    console.log("sync 2")
    console.log("sync 3")


}

//eventLoop()

function streams() {
    const fs = require('fs');

    const readable = fs.createReadStream('largefile.txt');
    const writable = fs.createWriteStream('copy.txt');

    readable.on('data', (chunk) => {
        const canWrite = writable.write(chunk);
        if (!canWrite) {
            console.log('Pausing readable');
            readable.pause();
            writable.once('drain', () => {
                console.log('Resuming readable');
                readable.resume();
            });
        }
    });

    readable.on('end', () => {
        writable.end();
    });

    // Or use pipes
    readable.pipe(writable)

}


function cpuintensive() {

    const problem = function () {
        const http = require('http');

        function fib(n) {
            if (n <= 1) return n;
            return fib(n - 1) + fib(n - 2);
        }

        http.createServer((req, res) => {
            if (req.url === '/fib') {
                const result = fib(40);
                res.end(`Result: ${result}`);
            } else {
                res.end('Hello World');
            }
        }).listen(3000);
    }


    sol = function () {

        const http = require('http');

        function runFibInWorker(n) {
            return new Promise((resolve, reject) => {
                const worker = new Worker('./fibWorker.js', { workerData: n });
                worker.on('message', resolve);
                worker.on('error', reject);
            });
        }

        http.createServer(async (req, res) => {
            if (req.url === '/fib') {
                const result = await runFibInWorker(40);
                res.end(`Result: ${result}`);
            } else {
                res.end('Hello World');
            }
        }).listen(3000);

    }
}

function cluster() {
    const cluster = require('cluster');
    const http = require('http');
    const numCPUs = require('os').cpus().length;

    console.log(numCPUs)

    if (cluster.isPrimary) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    } else {
        http.createServer(async (req, res) => {

            const p = new Promise((resolve, reject) => {
                console.log("called promise ")
                setTimeout(() => { console.log("timeout"); reject("rejected") }, 5000)
            })

            //await p;
        }).listen(3000);
    }

    process.on('uncaughtException', (err) => { console.log("unccauth excpetion") })
    process.on('unhandledRejection', (reason, promise) => { console.log(reason) })

}


async function testPromise() {
    new Promise(() => {
        console.log(1)
        process.nextTick(() => console.log(6))
        setImmediate(() => {
            console.log(2)
        })
        setTimeout(() => {
            console.log(3)
        }, 0);
    })
    process.nextTick(() => console.log(5))
    console.log(4)

    try {
        const res = await getSomething()
        console.log(res)
    }
    catch (er) {
        console.log(er)
    }

}

async function getSomething() {
    return new Promise((resolve, reject) => {
        console.log(7)
        setTimeout(() => resolve(8), 500)
    })
}

promiseTest2()


function promiseTest2()
{
    console.log('Start');

    async function first() {
        console.log('First Start');
        await second();
        console.log('First End');
    }

    async function second() {
        console.log('Second Start');
        await Promise.resolve();
        console.log('Second End');
    }

    first();

    Promise.resolve().then(() => console.log('Promise Then'));

    console.log('Synchronous End');

}