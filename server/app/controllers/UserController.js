const Controller = require("./Controller");
const _ = require("lodash");
const UserModel = require('../models/UserSchema').User;
const Model = require("../models/Model");
const CF = require('./CommonFunctionController');
const formidable = require('formidable');
const fs = require('fs');

class UserController extends Controller {

    constructor() {
        super();
    }


    async getAllUser() {
        let _this = this;
        try {
            let query = { isDeleted: false };
            var andArray = [];
            andArray.push(query);
            var mainQuery = { $and: andArray };
            const userData = await UserModel.aggregate([
                { $match: mainQuery },
                { $project: { _id: 1, firstName: 1, lastName: 1,email:1,phoneNumber:1,userImage:1 } },
                { $sort: { _id: -1 } }
            ]);
            const ShowingData = { UserDetails: userData };
            if (_.isEmpty(userData)) return _this.res.send(CF.getErrorMessage(0, 'User not found'));
            return _this.res.json(CF.getSuccessMessage(1, 'User  found Successfully.', 200, ShowingData));
        } catch (error) {
            console.log('error = ', error);
            return _this.res.send(CF.getErrorMessage(0, 'An internal error has occurred, please try again.', 0));
        }
    }


    async addUser() {
        let _this = this;
        try {
            if (!_this.req.body.firstName || !_this.req.body.lastName || !_this.req.body.email || !_this.req.body.phoneNumber) return _this.res.send(CF.getErrorMessage(0, 'Required fields are missing.', 500));
            let filter = { "email": _this.req.body.email };
            const user = await UserModel.findOne(filter);
            if (!_.isEmpty(user)) return _this.res.send(CF.getErrorMessage(0, 'Email already exist', 309));
            var saveObject = { 
                firstName: _this.req.body.firstName,
                lastName:_this.req.body.lastName,
                email:_this.req.body.email,
                phoneNumber:_this.req.body.phoneNumber,
                userImage:_this.req.body.userImage };
            if (_.isEmpty(user)) {
                const newUser = await new Model(UserModel).store(saveObject);
                if (_.isEmpty(newUser)) return _this.res.send(CF.getErrorMessage(0, 'User not saved.', 500));
                return _this.res.send(CF.getSuccessMessage(1, 'Congratulation, User successfully added', 200, newUser));
            }
        }
        catch (error) {
            console.log("errr-----", error);
            return _this.res.send(CF.getErrorMessage(0, 'An internal error has occurred, please try again.', 500));
        }
    }



    async deleteUser() {
        let _this = this;
        try {
            const UserData = await UserModel.findById(_this.req.body.userId);
            if (UserData) {
                await UserModel.updateOne({ _id: _this.req.body.userId }, { $set: { isDeleted: true } });
                return _this.res.send(CF.getSuccessMessage(1, 'User Deleted Successfully.', 200));
            }
            return _this.res.send(CF.getErrorMessage(0, 'User Data Not found', 500));
        }
        catch (error) {
            console.log("errr-----", error);
            return _this.res.send(CF.getErrorMessage(0, 'An internal error has occurred, please try again.', 500));
        }
    }

    async  updateUser() {
        let _this = this;
        try {
            const userData = await UserModel.findById(_this.req.body.id);
            if (userData) {
                await UserModel.updateOne({ _id: userData._id }, { $set: _this.req.body });
                return _this.res.send(CF.getSuccessMessage(1, 'User Updated Successfully', 200));
            }
            return _this.res.send(CF.getErrorMessage(0, 'User Not Found', 500));
        }
        catch (error) { console.log("errr-----", error); return _this.res.send(CF.getErrorMessage(0, 'An internal error has occurred, please try again.', 500)); }
    }

    async  getSingleUser() {
        let _this = this;
        try {
            const userData = await UserModel.findById(_this.req.body.UserId);
            if (userData) {
                return _this.res.send(CF.getSuccessMessage(1, 'User Found Successfully', 200, userData));
            }
            return _this.res.send(CF.getErrorMessage(0, 'User Not Found', 500));
        }
        catch (error) { console.log("errr-----", error); return _this.res.send(CF.getErrorMessage(0, 'An internal error has occurred, please try again.', 500)); }
    }


    async fileUpload() {
        let _this = this;
        let form = new formidable.IncomingForm();
        form.parse(_this.req, (err, fields, files) => {
            console.log(err)
            var oldpath = files.file.path;
            console.log(__dirname);
            var newpath = './public/' + files.file.name;
            fs.rename(oldpath, newpath, (err) => {
                console.log(err)
                if (err) return _this.res.send({ message: err, status: 0 });
                else return _this.res.send({ message: 'File uploaded successfully!', status: 1, fileName: files.file.name, filePath: 'http://localhost:3000/public/' + files.file.name });
            });
        });
    };
    


}
module.exports = UserController;