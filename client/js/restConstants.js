var RestConstants = RestConstants || {};

// Base URL
RestConstants.BASE_URL = "http://127.0.0.1:8081";

// GET
RestConstants.GET_STATUS = RestConstants.BASE_URL + "/status";
RestConstants.GET_FETCH = RestConstants.BASE_URL + "/fetch";
RestConstants.GET_PULL = RestConstants.BASE_URL + "/pull";

// POST
RestConstants.POST_COMMIT = RestConstants.BASE_URL + "/commit";
RestConstants.POST_PUSH = RestConstants.BASE_URL + "/push";