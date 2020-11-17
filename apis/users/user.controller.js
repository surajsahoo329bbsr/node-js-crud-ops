const { create, getUsers, getUserById, updateUser, deleteUser, getUserByEmail } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { request, json } = require("express");

module.exports = {
    createUser: (request, response) => {
        const body = request.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (error, results) => {
            if (error) {
                console.log(error);
                return response.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            return response.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (request, response) => {
        const id = request.params.id;
        getUserById(id, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return response.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return response.json({
                success: 1,
                message: results
            })
        })
    },
    getUsers: (request, response) => {
        getUsers((error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return response.json({
                    success: 0,
                    message: "No Records In Database"
                });
            }
            return response.json({
                success: 1,
                message: results
            })
        })
    },
    updateUser: (request, response) => {
        const body = request.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (error, results) => {
            if (error) {
                console.log(error);
                return false;
            }
            if (!results) {
                return response.json({
                    success: 0,
                    message: "Failed To Update"
                });
            }
            return response.json({
                success: 1,
                message: "Updated Successfully"
            });
        });
    },
    deleteUser: (request, response) => {
        const data = request.body;
        deleteUser(data, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return response.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return response.json({
                success: 1,
                message: "Record Deleted"
            })
        })
    },
    login: (request, response) => {
        const body = request.body;
        getUserByEmail(body.email, (error, results) => {
            if (error)
                console.log(error);
            if (!results) {
                return response.json({
                    success: 0,
                    message: "User Not Found"
                })
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsonwebtoken = sign({ result: results }, process.env.SECRET_KEY, {
                    expiresIn: "1h"
                });

                return response.json({
                    success: 1,
                    message: "Login Successful",
                    token: jsonwebtoken
                });
            } else {
                return response.json({
                    success: 0,
                    message: "Invalid Email / Password"
                });
            }
        })
    }
}