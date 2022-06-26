enum TokenTypes {
    token = "token",
    tokenInitialDate = "token-init-date" 
}

enum HttpStatus{
    badFormatted = 400,
    notAuthorized = 401,
    notFound = 404,
    conflict = 409,
    internalError = 500
}


export {
    TokenTypes,
    HttpStatus
};