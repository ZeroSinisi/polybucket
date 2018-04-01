class Branches {
    constructor(git) {
        this.git = git;
        this.local = {};
        this.remote = {};
        this.summary = {};
    }

    getLocalBranches() {
        return this.local;
    }

    getRemoteBranches() {
        return this.remote;
    }

    updateBranches() {
        return new Promise((resolve, reject) => {
            this.git.branch((error, summary) => {
                if (error) {
                    reject(error);
                }
                this.local = {};
                this.remote = {};
                summary.all.forEach(branch => {
                    if (branch.split("/")[0] === "remotes") {
                        this.remote[branch] = summary.branches[branch];
                    } else {
                        this.local[branch] = summary.branches[branch];
                    }
                })
                this.summary = summary;
                resolve(summary);
            });
        });
    }
}

module.exports = Branches;