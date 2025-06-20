class ApiResponse {
    constructor(statusCode,data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 //Automatically sets success to true for any status code < 400 (i.e., not an error).
    }
}

export {ApiResponse}