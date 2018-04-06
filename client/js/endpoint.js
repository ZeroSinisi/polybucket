class Endpoint {
    constructor(url) {
        this.url = url;
        this.request = null
        this.queryParams = {};
        return this;
    }

    setQueryParam(key, value) {
        this.queryParams[key] = value;
        return this;
    }

    get() {
        this.request = new Request(this.url + this._createQueryString());
        return fetch(this.request, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }

    post() {
        this.request = new Request(this.url + this._createQueryString());
        return fetch(this.request, {
            method: "POST"
        }).then(response => {
            return response.json();
        });
    }

    _createQueryString() {
        if (Object.keys(this.queryParams).length === 0) {
            return "";
        }
        let queryString = "?";
        Object.keys(this.queryParams).forEach((key, i) => {
            queryString = queryString + key + "=" + this.queryParams[key];
            if (i !== Object.keys(this.queryParams).length - 1) {
                queryString = queryString + "&";
            }
        });
        return queryString;
    }
}