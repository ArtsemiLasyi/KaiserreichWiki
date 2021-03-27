const mySql = require("../database/mysqlconnection");

const REQUEST_IS_EMAIL_ALREADY_EXIST = 'SELECT acc_id FROM account WHERE acc_email = ?';
const REQUEST_INSERT_ACCOUNT = 'INSERT INTO account (acc_login, acc_email, acc_password_hash) VALUES (?,?,?)';
const REQUEST_GET_ACCOUNT_BY_EMAIL = 'SELECT acc_id, acc_login, acc_password_hash FROM account WHERE acc_email = ?';
const REQUEST_UPDATE_ACCOUNT = 'UPDATE account SET acc_login = ? WHERE acc_id = ?';
const REQUEST_DELETE_ACCOUNT = 'DELETE FROM account WHERE acc_id = ?';


async function updateAccount() {
    try {
        sqlResult = await mySql.ConnectionPool.execute(REQUEST_UPDATE_ACCOUNT, [login], [id])
    } catch (ex) {
        console.log('Error');
        throw new Error(ex);
    }
}

async function deleteAccount(id) {
    try {
        sqlResult = await mySql.ConnectionPool.execute(REQUEST_DELETE_ACCOUNT, [id])
    } catch (ex) {
        console.log('Error');
        throw new Error(ex);
    }
}

async function isAccountAlreadyExist(email, login) {
    try {
        let flag;
        sqlResult = await mySql.ConnectionPool.execute(REQUEST_IS_EMAIL_ALREADY_EXIST, [email])
        if (sqlResult[0].length !== 0) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;
    } catch (ex) {
        console.log(`Error`);
        throw new Error(ex);
    }
}

async function createNewAccount(login, email, password) {
    try {
        return (await mySql.ConnectionPool.execute(REQUEST_INSERT_ACCOUNT, [login, email, password]))[0].insertId
    } catch (ex) {
        console.log(`Error`);
        throw new Error(ex);
    }
}

async function getAccountByEmail(email) {
    try {
        
        let sqlResult = await mySql.ConnectionPool.execute(REQUEST_GET_ACCOUNT_BY_EMAIL, [email])
        if (sqlResult[0].length === 0) {
            // To do
        }
        result =
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

module.exports.isAccountAlreadyExist = isAccountAlreadyExist
module.exports.createNewAccount = createNewAccount
module.exports.getAccountByEmail = getAccountByEmail
module.exports.updateAccount = updateAccount
module.exports.deleteAccount = deleteAccount