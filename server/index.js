const git = require("simple-git")();
const http = require("http");

const hostname = "127.0.0.1";
const port = "8081";

async function gitStatus() {
    return new Promise(resolve => {
        git.status((error, info) => {
            resolve(info);
        });
    });
}

async function gitPush() {

}

function handleStatus(req, res) {
    gitStatus().then(status => {
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(status));
    }, error => {
        console.log(error);
    });
}

function handlePull(req, res) {
    const query = require('url').parse(req.url, true).query;
    gitPush(query).then(status => {
        rest.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(status));
    }, error => {
        console.log(error);
    });
}

function handlePush(req, res) {
    console.log(req);
    console.log(res);
}

function handleGet(req, res) {
    switch (req.url) {
        case "/status":
            handleStatus(req, res);
            break;
        default:
            handlePull(req, res);
            break;
    }
}

function handlePost(req, res) {
    switch (req.url) {
        case "/push":
            handlePush(req, res);
            break;
    }
}

const server = http.createServer((req, res) => {
    console.log("Request received");
    switch (req.method) {
        case "GET":
            handleGet(req, res);
            break;
        case "POST":
            handlePost(req, res);
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});