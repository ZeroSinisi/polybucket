const fs = require("fs");
const Repository = require("./repository.js");

class Utils {
    static loadRepositories() {
        if (fs.existsSync("repositories.json")) {
            let jsonStr = fs.readFileSync("repositories.json", "utf8");
            let json = JSON.parse(jsonStr);
            Object.keys(json).forEach(repo => {
                json[repo] = new Repository(json[repo].name, json[repo].localPath);
            });
            return json;
        } else {
            return {};
        }
    }

    static saveRepository(repo) {
        let currentRepos = Utils.loadRepositories();
        currentRepos[repo.name] = {
            name: repo.name,
            localPath: repo.localPath
        };
        fs.writeFileSync("repositories.json", JSON.stringify(currentRepos));
    }
}

module.exports = Utils;