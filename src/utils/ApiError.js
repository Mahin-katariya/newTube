class ApiError extends Error {
    constructor(
        statusCode,
        message ='Something went wrong',
        errors = [],
        stack = ""  
    ){
        super(message) //calls the Error.message
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        // good practice for tracking down where did the error occur
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}