class Response{
    constructor(error,message,data){
        this.error = error;
        this.message = message;
        this.data = data;
    }
}

module.exports = Response;