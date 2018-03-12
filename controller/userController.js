const User = require('../models').user;
const helper = require('../common/helper');

function getUsers(req, res, next) {
    User.findAll({})
        .then(Users => {
            helper.success(res, next, Users);
            return next();
        })
        .catch(err => {
            if (err) {
                helper.logger('GET', 'error', 'getUser STACKTRACE :'+ err.stack);
                helper.failure(res, next, 'Problem with the request', 400);
                return next();
            }
        });
}

function postUser(req, res, next) {
    User.create(req.body)
        .then(newUser => {
            helper.success(res, next, newUser);
            return next();
        })
        .catch(err => {
            helper.logger('POST', 'error', 'postUser STACKTRACE :'+ err.stack);
            if (err) {
                if (err.message.includes("validation")) {
                    helper.failure(res, next, "Validation failed, please enter all the required fields", 400);
                    return next();
                } else if (err.message.includes("duplicate")) {
                    helper.failure(res, next, "The specified User name already exists", 400);
                    return next();
                } else {
                    helper.failure(res, next, 'Problem while saving the worklow into database' + err, 500);
                    return next();
                }
            }

        });
}


function deleteUser(req, res, next) {
    User.destroy({ where: { Email: req.params.Email } })
        .then(function (rowDeleted) {
            helper.success(res, next, 'User ' + req.params.Email + ' deleted successfully');
            return next();
        })
        .catch(err => {
            if (err) {
                helper.logger('DELETE', 'error', 'deleteUser STACKTRACE :'+ err.stack);
                helper.failure(res, next, 'The specified User cannot be deleted from the database', 500);
                return next();
            }

        });
}

function updateUser(req, res, next) {
  
    var User_Email = req.params.Email;
    var { FirstName, LastName, Email, Address } = req.body;

    User.update({
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Address: Address,
      }, {
            where: {
                Email: User_Email
            }
        })
        .then(User => {
            helper.success(res, next, 'The specified User updated successfully');
            return next();
        })
        .catch(err => {
            helper.logger('UPDATE', 'error', 'updateUser STACKTRACE :'+ err.stack);
            if (err.name == 'ValidationError') {
                console.log('Validation Error details = ' + err);
                helper.failure(res, next, { "Validation Error": err.message }, 400);
                return next();
            } else {
                helper.failure(res, next, "Error while updating the User", 500);
                return next();
            }
        })


}

function getUserByName(req, res, next) {
    User.findOne({ where: { FirstName: req.params.FirstName } })
        .then(User => {
            helper.success(res, next, User);
            return next();
        })
        .catch(err => {
            helper.logger('GET', 'error', 'getUserByName STACKTRACE :'+ err.stack);
            if (err) {
                if (err.FirstName = 'CastError') {
                    helper.failure(res, next, "The specified FirstName was not found", 404);
                    return next();
                }
                else {
                    failure(res, next, "Error while fetching data from the database", 500);
                    return next();
                }
            }
        });
}

//export all the functions
module.exports = { getUsers, postUser, deleteUser, updateUser, getUserByName };