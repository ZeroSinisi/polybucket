import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";

class NewRepo extends PolymerElement {
    static get properties() {
        return {
            repoName: {
                type: String,
                value: ""
            },

            localDir: {
                type: String,
                value: ""
            }
        }
    }

    static get template() {
        return html `
            <div class="selector">
                <div class="inputText">Repository name: </div>
                <input id="nameText">[[repoName]]</input>
            </div>
            <div class="selector">
                <div class="inputText">Enter a local directory: </div>
                <input id="localPathText">[[localDir]]</input>
            </div>
            <button id="addNewBtn" onclick="_handleAddNewRepo">Add new Repository</button>
        `;
    }

    _handleAddNewRepo() {
        console.log("Adding new repo");
        let endpoint = new Endpoint(RestConstants.NEW_REPO)
            .setQueryParam("name", this.repoName)
            .setQueryParam("localUrl", this.localUrl)
            .post();
        endpoint.then(response => {
            console.log(response);
        })
    }
}

customElements.define("new-repo", NewRepo);
