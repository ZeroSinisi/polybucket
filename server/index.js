const git = require("simple-git")();
console.log(git);
const http = require("http");
const URL = require("url");
const Branches = require("./branches.js")
const Repository = require("./repository.js");

const hostname = "127.0.0.1";
const port = "8081";

function respondToClient(response, content) {
    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.end(content);
}

async function gitStatus() {
    return new Promise(resolve => {
        git.status((error, info) => {
            resolve(info);
        });
    });
}

async function gitPull(query) {
    return new Promise(resolve => {
        git.pull(query.remote, query.branch, query.options, (error, info) => {
            resolve(info);
        });
    });
}

async function gitFetch(query) {
    return new Promise(resolve => {
        git.fetch(query.remote, query.branch, (error, info) => {
            resolve(info);
        });
    })
}

async function gitPush() {

}

function handleStatus(req, res) {
    gitStatus().then(status => {
        respondToClient(res, JSON.stringify(status));
    }, error => {
        console.log(error);
    });
}

function handlePull(req, res) {
    const query = URL.parse(req.url, true).query;
    gitPull(query).then(status => {
        respondToClient(res, JSON.stringify(status));
    }, error => {
        console.log(error);
    });
}

function handleFetch(req, res) {
    const query = URL.parse(req.url, true).query;
    gitFetch(query).then(status => {
        respondToClient(res, JSON.stringify(status));
    }, error => {
        console.log(error);
    });
}

function handlePush(req, res) {
    console.log(req);
    console.log(res);
}

function handleBranch(req, res) {
    switch (req.url.split("/")[2]) {
        case "local":
            branches.updateLocalBranches().then(local => {
                respondToClient(res, JSON.stringify(local));
            }, error => {
                console.log(error);
            });
            break;
        case "remote":
            branches.updateRemoteBranches().then(remote => {
                respondToClient(res, JSON.stringify(remote));
            }, error => {
                console.log(error);
            });
            break;
    }
}

function handleNewRepo(req, res) {
    const query = URL.parse(req.url, true).query;
    let repo = new Repository(query.name, query.localUrl);
    repo.init().then(repo => {
        respondToClient(res, JSON.stringify(repo));
    }, error => {
        console.log(error);
    })
}

function handleRepo(req, res, url) {
    switch (url.pathname.split("/")[2]) {
        case "new":
            handleNewRepo(req, res);
            break;
        case "load":

            break;
    }
}

function handleGet(req, res, url) {
    switch (url.pathname.split("/")[1]) {
        case "status":
            handleStatus(req, res);
            break;
        case "pull":
            handlePull(req, res);
            break;
        case "fetch":
            handleFetch(req, res);
            break;
        case "branch":
            handleBranch(req, res);
            break;
    }
}

function handlePost(req, res, url) {
    switch (url.pathname.split("/")[1]) {
        case "push":
            handlePush(req, res);
            break;
        case "repo":
            handleRepo(req, res, url);
            break;
    }
}

const server = http.createServer((req, res) => {
    console.log("Request received");
    let url = URL.parse(req.url, true);
    switch (req.method) {
        case "GET":
            handleGet(req, res, url);
            break;
        case "POST":
            handlePost(req, res, url);
            break;
    }
});

const branches = new Branches(git);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});