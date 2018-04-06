import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";

class HomePage extends PolymerElement {
    static get properties() {
        return {
            repoList: {
                type: Array,
                value: []
            },

            selectedRepo: {
                type: Object,
                value: null
            }
        }
    }

    static get template() {
        return html `
            <iron-list id="repoSelector" selected-item={{selectedRepo}} items="[[repoList]]" as="repo">
                <template>
                    <div class="element">[[repo.name]]</div>
                </template>
            </iron-list>
            <repo-view repo=[[selectedRepo]]></repo-view>
        `;
    }

    constructor() {
        super();
        let endpoint = new Endpoint(RestConstants.LOAD_REPO).get();
        endpoint.then(repos => {
            Object.keys(repos).forEach(key => {
                this.push("repoList", repos[key]);
            });
        });
    }

    ready() {
        super.ready();
        this.$.repoSelector.selectionEnabled = true;
    }
}

customElements.define("home-page", HomePage);
