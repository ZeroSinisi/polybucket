class Branches {
    constructor(git) {
        this.git = git;
        this.local = null;
        this.remote = null;
    }

    getLocalBranches() {
        return this.local;
    }

    getRemoteBranches() {
        return this.remote;
    }

    updateLocalBranches() {
        return new Promise((resolve, reject) => {
            this.git.branchLocal((error, local) => {
                if (error) {
                    reject(error);
                }
                this.local = local;
                resolve(this.local);
            })
        });
    }

    updateRemoteBranches() {
        return new Promise((resolve, reject) => {
            this.git.branch([], (error, remote) => {
                if (error) {
                    reject(error);
                }
                this.remote = remote;
                resolve(remote);
            });
        });
    }
}

module.exports = Branches;