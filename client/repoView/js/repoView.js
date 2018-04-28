import {PolymerElement, html} from "@polymer/polymer/polymer-element.js";
import "../../../node_modules/@polymer/iron-collapse/iron-collapse.js";
import "../../../node_modules/@polymer/paper-item/paper-item.js";

class RepoView extends PolymerElement {
    static get properties() {
        return {
            repo: {
                type: Object,
                value: null,
                observer: "_handleRepoSelected"
            },

            localBranches: {
                type: Array,
                value: []
            },

            remoteBranches: {
                type: Array,
                value: []
            },

            branchesOpened: {
                type: Boolean,
                value: false
            },

            localOpened: {
                type: Boolean,
                value: false
            },

            remoteOpened: {
                type: Boolean,
                value: false
            }
        }
    }

    static get template() {
        return html `
            <div>Polymer Repo View Element</div>
            <div>Showing repo [[repo.name]]</div>
            <paper-item toggles="true" active={{branchesOpened}}>Branches</paper-item>
            <iron-collapse opened={{branchesOpened}}>
                <paper-item toggles="true" active={{localOpened}}>Local</paper-item>
                <iron-collapse opened={{localOpened}}>
                    <dom-repeat items=[[localBranches]]>
                        <template>
                            <paper-item>[[item.name]]</paper-item>
                        </template>
                    </dom-repeat>
                </iron-collapse>

                <paper-item toggles="true" active={{remoteOpened}}>Remote</paper-item>
                <iron-collapse opened="{{remoteOpened}}">
                    <dom-repeat items=[[remoteBranches]]>
                        <template>
                            <paper-item>[[item.name]]</paper-item>
                        </template>
                    </dom-repeat>
                </iron-collapse>
            </iron-collapse>
        `;
    }

    _handleRepoSelected() {
        console.log(this.repo);
        if(this.repo != null) {
            this.set("localBranches", Object.values(this.repo.branches.local));
            this.set("remoteBranches", Object.values(this.repo.branches.remote));
        } else {
            this.set("localBranches", []);
            this.set("remoteBranches", []);
        }
    }
}

customElements.define("repo-view", RepoView);
