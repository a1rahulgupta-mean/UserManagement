module.exports = (app, express) => {

    const router = express.Router();
    const UserController = require('../controllers/UserController');
    const config = require('../../configs/configs');

    router.post('/addUser', (req, res, next) => {
        const userObj = (new UserController()).boot(req, res);
        return userObj.addUser();
    })

    router.get('/getAllUser', (req, res, next) => {
        const userObj = (new UserController()).boot(req, res);
        return userObj.getAllUser();
    })

    router.post('/deleteUser',(req, res, next) => {
        const userObj = (new UserController()).boot(req, res);
        return userObj.deleteUser();
    })

    router.post('/updateUser',(req, res, next) => {
        const userObj = (new UserController()).boot(req, res);
        return userObj.updateUser();
    })

    router.post('/getSingleUser',(req, res, next) => {
        const userObj = (new UserController()).boot(req, res);
        return userObj.getSingleUser();
    })

    
    router.post('/fileUpload',(req, res, next) => {
        const userObj = (new UserController()).boot(req, res);
        return userObj.fileUpload();
    })
    



    app.use(config.baseApiUrl, router);
}