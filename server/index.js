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

async function gitClone(repoPath, localPath, options, then) {
    return new Promise(resolve => {
        git.clone(repoPath, localPath, options, then);
    });
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

function handleGet(req, res) {
    switch (req.url) {
        case "/status":
            handleStatus(req, res);
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
            console.log("Request was a POST");
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});