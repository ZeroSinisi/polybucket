import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";

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
            },

            showRepoList: {
                type: Boolean,
                value: true
            },

            showNewRepo: {
                type: Boolean,
                value: false
            }
        }
    }

    static get template() {
        return html `
            <style is="custom-style" include="iron-flex">
                button {
                    margin-bottom: 1em;
                }

                .repo-list {
                    margin-right: 100px;
                }

            </style>
            <div class="layout horizontal flex-auto">
                <div class="layout vertical repo-list">
                    <template is="dom-if" if="[[showRepoList]]">
                        <button id="newRepoBtn"
                                on-click="[[_handleNewRepoClicked()]]">
                            New Repository
                        </button>
                        <paper-listbox id="repoListbox"
                                       attr-for-selected="value"
                                       selected="{{selectedRepo}}">
                            <dom-repeat items=[[repoList]]>
                                <template>
                                    <paper-item value="[[item]]">[[item.name]]</div>
                                </template>
                            </dom-repeat>
                        </iron-list>
                    </template>
                    <template is="dom-if" if="[[showNewRepo]]">
                        <new-repo></new-repo>
                    </template>
                </div>
                <div class="layout vertical flex">
                    <repo-view repo=[[selectedRepo]]></repo-view>
                </div>
            </div>
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
    }

}

customElements.define("home-page", HomePage);
