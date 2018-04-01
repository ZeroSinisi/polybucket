window.RestConstants = window.RestConstants || null;

if (window.RestConstants == null) {
    RestConstants = {};
    // Base URL
    RestConstants.BASE_URL = "http://127.0.0.1:8081";

    // GET
    RestConstants.GET_STATUS = RestConstants.BASE_URL + "/status";
    RestConstants.GET_FETCH = RestConstants.BASE_URL + "/fetch";
    RestConstants.GET_PULL = RestConstants.BASE_URL + "/pull";

    // POST
    RestConstants.POST_COMMIT = RestConstants.BASE_URL + "/commit";
    RestConstants.POST_PUSH = RestConstants.BASE_URL + "/push";

    RestConstants.REPO = RestConstants.BASE_URL + "/repo";
    RestConstants.NEW_REPO = RestConstants.REPO + "/new";
    RestConstants.LOAD_REPO = RestConstants.REPO + "/load";
}