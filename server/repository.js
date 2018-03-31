const Branches = require("./branches.js");
class Repository {
    constructor(name, localPath) {
        this.name = name;
        this.git = require("simple-git")(localPath);
        this.branches = new Branches(this.git);
    }

    init() {
        return new Promise((resolve, reject) => {
            this.git.fetch((error, data) => {
                if (error) {
                    reject(error);
                }
                console.log(data);
                this.branches.updateLocalBranches().then(() => {
                    this.branches.updateRemoteBranches().then(() => {
                        resolve(this);
                    });
                });
            })
        });
    }
}

module.exports = Repository;