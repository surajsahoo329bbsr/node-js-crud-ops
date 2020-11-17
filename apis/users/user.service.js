const pool = require("../../configs/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO registration (first_name, last_name, gender, email, password, phone_no) 
                VALUES (?, ?, ?, ?, ?, ?);`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.phone_no
            ],
            (error, results, fields) => {
                if (error)
                    return callBack(error);
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `SELECT * FROM registration;`,
            [],
            (error, results, fields) => {
                if (error)
                    return callBack(error);
                return callBack(null, results);
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(
            `SELECT * FROM registration WHERE id = ?;`,
            [id],
            (error, results, fields) => {
                if (error)
                    return callBack(error);
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE registration SET first_name = ?, last_name = ?, gender = ?, email = ?, password = ?, phone_no = ? where id = ?;`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.phone_no,
                data.id
            ],
            (error, results, fields) => {
                if (error)
                    callBack(error);
                return callBack(null, results);
            }
        )
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `DELETE FROM registration WHERE id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error)
                    callBack(error);
                return callBack(null, results[0]);
            }
        );
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM registration WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if (error)
                    callBack(error);
                return callBack(null, results[0]);
            }
        )
    }
};