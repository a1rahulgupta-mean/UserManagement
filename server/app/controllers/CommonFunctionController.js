
const Controller = require("./Controller");

class CommonFunctionController extends Controller {

    constructor() {
        super();
    }

    static getErrorMessage(status, message, statusCode) {
        return { settings: { status, message, statusCode } }
    }

   
    static getSuccessMessage(status, message, statusCode, data) {
        return { settings: { status, message, statusCode }, data }
    }
}
module.exports = CommonFunctionController;