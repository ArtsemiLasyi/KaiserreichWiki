const mysql = require("../database/mysqlconnection");

const REQUEST_IS_EMAIL_ALREADY_EXIST = 'SELECT acc_id FROM account WHERE u_email = ?'
const REQUEST_INSERT_ACCOUNT = 'INSERT INTO account (acc_login, acc_email, acc_password_hash) VALUES (?,?,?)'
const REQUEST_GET_ACCOUNT_BY_EMAIL = 'SELECT u_id, u_login, u_hash FROM account WHERE acc_email = ?';




async function isAccountAlreadyExist(email, login) {
    try {
        sqlResult = await mySqlConnectionPool.execute(REQUEST_IS_EMAIL_ALREADY_EXIST, [email])
        if (sqlResult[0].length !== 0) {
            result.message = "Пользователь с таким email'ом уже зарегистрирован"
            return result
        }
        result.result = true;
        return result
    } catch (ex) {
        console.log(`Error`);
        throw new Error(ex);
    }
}

async function createNewAccount(login, email, password) {
    try {
        return (await mySqlConnectionPool.execute(REQUEST_INSERT_ACCOUNT, [login, email, password]))[0].insertId
    } catch (ex) {
        console.log(`Error`);
        throw new Error(ex);
    }
}

async function getUserByEmail(email) {
    try {
        
        let sqlResult = await mySqlConnectionPool.execute(REQUEST_GET_USER_BY_EMAIL, [email])
        if (sqlResult[0].length === 0) {
            // To do
        }
        result.result =
            {
                login: sqlResult[0][0]['acc_login'],
                email: sqlResult[0][0]['acc_email']
            }
        return result;

    } catch (ex) {
        console.log('Error!');
        throw new Error(ex);
    }
}

module.exports.isUserAlreadyExist = isUserAlreadyExist
module.exports.createNewUser = createNewUser
module.exports.getUserByLogin = getUserByLogin