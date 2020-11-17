const { request, response } = require("express");
const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (request, response, next) => {
        let token = request.get("authorization");
        if (token) {
            token = token.slice(7) // Bearer split starting from 8th positon
            verify(token, process.env.SECRET_KEY, (error, decoded) => {
                if (error) {
                    response.json({
                        success: 0,
                        message: "Invalid Token"
                    })
                } else {
                    next();
                }
            });
        } else {
            response.json({
                success: 0,
                message: "Unauthorized User"
            });
        }
    }
}