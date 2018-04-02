class Endpoint {
    constructor(url) {
        this.url = url;
        this.request = new XMLHttpRequest();
        this.queryParams = {};
        return this;
    }

    setQueryParam(key, value) {
        this.queryParams[key] = value;
        return this;
    }

    get() {
        let queryString = this._createQueryString();
        this.request.open("GET", this.url + queryString, true);
        return this._constructPromise();
    }

    post() {
        let queryString = this._createQueryString();
        this.request.open("POST", this.url + queryString, true);
        return this._constructPromise();
    }

    _constructPromise() {
        let promiseResolver = null;
        let promise = new Promise(resolve => {
            promiseResolver = resolve;
        });
        this.request.addEventListener("load", () => {
            promiseResolver(JSON.parse(this.request.response));
        });
        this.request.send();
        return promise;
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