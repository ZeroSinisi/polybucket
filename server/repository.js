const Branches = require("./branches.js");
class Repository {
    constructor(name, localPath) {
        this.name = name;
        this.localPath = localPath;
        this.git = require("simple-git")(localPath);
        this.branches = new Branches(this.git);
    }

    init() {
        return new Promise((resolve, reject) => {
            this.branches.updateBranches().then(() => {
                resolve(this);
            });
        });
    }
}

module.exports = Repository;