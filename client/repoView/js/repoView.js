import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";

class RepoView extends PolymerElement {
    static get properties() {
        return {
            repo: {
                type: Object,
                value: null
            }
        }
    }

    static get template() {
        return html `
            <div>Polymer Repo View Element</div>
            <div>Showing repo [[repo.name]]</div>
        `;
    }
}

customElements.define("repo-view", RepoView);
