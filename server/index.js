const git = require("simple-git")();
const http = require("http");

const hostname = "127.0.0.1";
const port = "8080";

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

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    gitStatus().then(status => {
        res.end(JSON.stringify(status));
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});